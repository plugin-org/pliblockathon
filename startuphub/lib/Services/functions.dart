import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'form.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/io.dart';

class Services extends ChangeNotifier {
  List<form> startups = [];
  final String _rpcUrl =
      Platform.isAndroid ? 'http://10.0.2.2:7545' : 'http://127.0.0.1:7545';
  final String _wsUrl =
      Platform.isAndroid ? 'http://10.0.2.2:7545' : 'ws://127.0.0.1:7545';
  bool isLoading = true;

  final String _privatekey =
      '202b9d3e13a004b00c7be08f7dc7168ef355180bfb52999b14d4dc0369bb6f3d';
  late Web3Client _web3cient;

  Services() {
    init();
  }

  Future<void> init() async {
    _web3cient = Web3Client(
      _rpcUrl,
      http.Client(),
      socketConnector: () {
        return IOWebSocketChannel.connect(_wsUrl).cast<String>();
      },
    );
    await getABI();
    await getCredentials();
    await getDeployedContract();
  }

  late ContractAbi _abiCode;
  late EthereumAddress _contractAddress;
  Future<void> getABI() async {
    String abiFile = await rootBundle.loadString('contracts/startup.json');
    var jsonABI = jsonDecode(abiFile);
    _abiCode =
        ContractAbi.fromJson(jsonEncode(jsonABI['abi']), 'startupContract');
    _contractAddress =
        EthereumAddress.fromHex(jsonABI["networks"]["5777"]["address"]);
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
    List totalstartuplist = await _web3cient.call(
      contract: _deployedContract,
      function: _startupCount,
      params: [],
    );

    int totalstartuplen = totalstartuplist[0].toInt();
    startups.clear();
    for (var i = 0; i < totalstartuplen; i++) {
      var temp = await _web3cient.call(
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
    await _web3cient.sendTransaction(
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
