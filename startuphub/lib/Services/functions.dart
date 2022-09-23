import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'form.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;

String infura_url = "https://rpc.apothem.network";

//String contractAddress1 = "0x8d05266f239fc8e1b7927f42a2e77a2cc732dde6";

class Services extends ChangeNotifier {
  List<form> startups = [];
  String contractAddress1 = "0xa9993ef3d4387896edf9a46b1b66619fdbee1b4e";
  bool isLoading = true;
  final String _privatekey =
      "700dc82842555bef5064cab174a99deedbdb14c0e312aecef548d26014bd67f9";
  Web3Client? _web3cient;

  Services() {
    init();
  }

  Future<void> init() async {
    _web3cient = Web3Client(infura_url, http.Client());
    await getABI();
    await getCredentials();
    await getDeployedContract();
  }

  late ContractAbi _abiCode;
  late EthereumAddress _contractAddress;
  Future<void> getABI() async {
    String abi = await rootBundle.loadString('assets/abi.json');
    _abiCode = ContractAbi.fromJson(abi, 'startupContract');
    _contractAddress = EthereumAddress.fromHex(contractAddress1);
  }

  late EthPrivateKey _creds;
  Future<void> getCredentials() async {
    _creds = EthPrivateKey.fromHex(_privatekey);
  }

  late DeployedContract _deployedContract;
  late ContractFunction _createStartup;
  late ContractFunction _startups;
  late ContractFunction _startupCount;

  Future<void> getDeployedContract() async {
    _deployedContract = DeployedContract(_abiCode, _contractAddress);
    _createStartup = _deployedContract.function('createStartup');
    _startups = _deployedContract.function('startups');
    _startupCount = _deployedContract.function('startupCount');
    await fetchform();
  }

  Future<void> fetchform() async {
    List totalstartuplist = await _web3cient!.call(
      contract: _deployedContract,
      function: _startupCount,
      params: [],
    );

    int totalstartuplen = totalstartuplist[0].toInt();
    startups.clear();
    for (var i = 0; i < totalstartuplen; i++) {
      var temp = await _web3cient!.call(
          contract: _deployedContract,
          function: _startups,
          params: [BigInt.from(i)]);
      if (temp[1] != "") {
        startups.add(
          form(
            id: (temp[0] as BigInt).toInt(),
            title: temp[1],
            description: temp[2],
          ),
        );
      }
    }
    isLoading = false;

    notifyListeners();
  }

  Future<void> addStartup(String title, String description) async {
    await _web3cient!.sendTransaction(
      _creds,
      Transaction.callContract(
        contract: _deployedContract,
        function: _createStartup,
        parameters: [title, description],
      ),
    );
    isLoading = true;
    fetchform();
  }
}
