import smartpy as sp
DECIMAL = 1000000000000000000
TZIP16_Metadata_Base = {
    "name"          : "NCU Coin",
    "description"   : "A Coin to promote decentralisation in NCU",
    "homepage"      : "https://nft.netlify.app/",
    "interfaces"    : [
        "TZIP-007-2021-04-17",
        "TZIP-016-2021-04-17"
    ],
}
class FA12_Error:
    def make(s): return ("FA1.2_" + s)

    NotAdmin                        = make("NotAdmin")
    InsufficientBalance             = make("InsufficientBalance")
    UnsafeAllowanceChange           = make("UnsafeAllowanceChange")
    NotAllowed                      = make("NotAllowed")
    ZeroTransfer                    = make("Zero_Transfer")
    SameAddressTransfer             = make("Same_Address_Transfer")
    NotExchange                     = make("NotExchange")
    ExchangeChange                  = make("CannotUpdate")
class FA12_config:
    def __init__(
        self,
        support_upgradable_metadata         = False,
        use_token_metadata_offchain_view    = True,
    ):
        self.support_upgradable_metadata = support_upgradable_metadata
        self.use_token_metadata_offchain_view = use_token_metadata_offchain_view
class FA12_common:
    def normalize_metadata(self, metadata):
        """
            Helper function to build metadata JSON (string => bytes).
        """
        for key in metadata:
            metadata[key] = sp.utils.bytes_of_string(metadata[key])

        return metadata

class FA12_core(sp.Contract, FA12_common):
    def __init__(self, config, **extra_storage):
        self.config = config

        self.init(
            balances = sp.big_map(tvalue = sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)),
            totalSupply = 0,
            securityCheck = False,
            **extra_storage
        )

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify(
            ( ((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value))), FA12_Error.NotAllowed)

        self.addAddressIfNecessary(params.from_)
        self.addAddressIfNecessary(params.to_)

        sp.verify(params.value > 0 , FA12_Error.ZeroTransfer)
        sp.verify(params.from_ != params.to_, FA12_Error.SameAddressTransfer)

        sp.verify(self.data.balances[params.from_].balance >= params.value, FA12_Error.InsufficientBalance)
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)

    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        self.addAddressIfNecessary(sp.sender)

        alreadyApproved = self.data.balances[sp.sender].approvals.get(params.spender, 0)
        sp.verify((alreadyApproved == 0) | (params.value == 0), FA12_Error.UnsafeAllowanceChange)
        self.data.balances[sp.sender].approvals[params.spender] = params.value

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})

    @sp.utils.view(sp.TNat)
    def getBalance(self, params):
        sp.if self.data.balances.contains(params):
            sp.result(self.data.balances[params].balance)
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getAllowance(self, params):
        sp.if self.data.balances.contains(params.owner):
            sp.result(self.data.balances[params.owner].approvals.get(params.spender, 0))
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getTotalSupply(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.totalSupply)
    
    @sp.onchain_view()
    def getBalanceOnChain(self, params):
        sp.if self.data.balances.contains(params):
            sp.result(self.data.balances[params].balance)
        sp.else:
            sp.result(sp.nat(0))
    def is_administrator(self, sender):
        return sp.bool(False)

class ContractLibrary(sp.Contract):


    def TransferFATwoTokens(sender,reciever,amount,tokenAddress,id):

        arg = [
            sp.record(
                from_ = sender,
                txs = [
                    sp.record(
                        to_         = reciever,
                        token_id    = id , 
                        amount      = amount 
                    )
                ]
            )
        ]

        transferHandle = sp.contract(
            sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), 
            tokenAddress,
            entry_point='transfer').open_some()

        sp.transfer(arg, sp.mutez(0), transferHandle)


    def TransferFATokens(sender,reciever,amount,tokenAddress): 

        TransferParam = sp.record(
            from_ = sender, 
            to_ = reciever, 
            value = amount
        )

        transferHandle = sp.contract(
            sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))),
            tokenAddress,
            "transfer"
            ).open_some()

        sp.transfer(TransferParam, sp.mutez(0), transferHandle)

    def TransferToken(sender, reciver, amount, tokenAddress,id, faTwoFlag): 

        sp.if faTwoFlag: 

            ContractLibrary.TransferFATwoTokens(sender, reciver, amount , tokenAddress, id )

        sp.else: 

            ContractLibrary.TransferFATokens(sender, reciver, amount, tokenAddress)

    
class FA12_mint_burn(FA12_core, ContractLibrary):

    @sp.entry_point
    def mint(self,params):
       
        sp.verify((self.is_administrator(sp.sender)) | (sp.sender == self.data.exchangeAddress), message = "Not Admin or Exchange")

        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))

        self.addAddressIfNecessary(params.address)

        self.data.balances[params.address].balance = self.data.balances[params.address].balance + params.value
        self.data.totalSupply = self.data.totalSupply + params.value

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))

        sp.verify((self.is_administrator(sp.sender)) | (sp.sender == self.data.exchangeAddress), message = "Not Admin or Exchange")

        sp.verify(self.data.balances[params.address].balance >= params.value, FA12_Error.InsufficientBalance)
        
        self.data.balances[params.address].balance = sp.as_nat(self.data.balances[params.address].balance - params.value)
        self.data.totalSupply = sp.as_nat(self.data.totalSupply - params.value)

    @sp.entry_point
    def updateExchangeAddress(self,address): 

        sp.set_type(address, sp.TAddress)
        
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)

        sp.verify(self.data.securityCheck == False, FA12_Error.ExchangeChange)
        
        self.data.exchangeAddress = address

        self.data.securityCheck = True 

    @sp.entry_point
    def RecoverExcessToken(self,params): 

        sp.set_type(params, sp.TRecord( tokenAddress = sp.TAddress, reciever = sp.TAddress, tokenId = sp.TNat, amount = sp.TNat, faTwoCheck = sp.TBool ))

        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)

        ContractLibrary.TransferToken(sp.self_address, params.reciever, params.amount, params.tokenAddress, params.tokenId, params.faTwoCheck)

class FA12_administrator(FA12_core):
    def is_administrator(self, sender):
        return sender == self.data.administrator

    @sp.entry_point
    def setAdministrator(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(self.is_administrator(sp.sender), FA12_Error.NotAdmin)
        self.data.administrator = params

    @sp.utils.view(sp.TAddress)
    def getAdministrator(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.administrator)


class FA12_token_metadata(FA12_core):
    """
        SPEC: https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#token-metadata
        Token-specific metadata is stored/presented as a Michelson value of type (map string bytes).
        A few of the keys are reserved and predefined:
        >>    ""          : Should correspond to a TZIP-016 URI which points to a JSON representation of the token
                            metadata.
        >>    "name"      : Should be a UTF-8 string giving a “display name” to the token.
        >>    "symbol"    : Should be a UTF-8 string for the short identifier of the token (e.g. XTZ, EUR, …).
        >>    "decimals"  : Should be an integer (converted to a UTF-8 string in decimal) which defines the position of                   the decimal point in token balances for displaypurposes.
    """
    def set_token_metadata(self, metadata):
        """
            Store the token_metadata values in a big-map annotated %token_metadata
            of type (big_map nat (pair (nat %token_id) (map %token_info string bytes))).
        """
        self.update_initial_storage(
            token_metadata = sp.big_map(
                {
                    0: sp.record(token_id = 0, token_info = self.normalize_metadata(metadata))
                },
                tkey = sp.TNat,
                tvalue = sp.TRecord(token_id = sp.TNat, token_info = sp.TMap(sp.TString, sp.TBytes))
            )
        )
class FA12_contract_metadata(FA12_core):
    """
        SPEC: https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-16/tzip-16.md
        This class offers utilities to define and set TZIP-016 contract metadata.
    """
    def generate_tzip16_metadata(self):
        views = []

        def token_metadata(self, token_id):
            """
                This method will become an offchain view if the contract uses TZIP-016 metadata
                and the config `use_token_metadata_offchain_view` is set to TRUE.
                Return the token-metadata URI for the given token. (token_id must be 0)
                For a reference implementation, dynamic-views seem to be the
                most flexible choice.
            """
            sp.set_type(token_id, sp.TNat)
            sp.result(self.data.token_metadata[token_id])

        if self.usingTokenMetadata and self.config.use_token_metadata_offchain_view:
            self.token_metadata = sp.offchain_view(pure = True, doc = "Get Token Metadata")(token_metadata)
            views += [self.token_metadata]

        metadata = {
            **TZIP16_Metadata_Base,
            "views"         : views
        }

        self.init_metadata("metadata", metadata)

    def set_contract_metadata(self, metadata):
        """
           Set contract metadata
        """
        self.update_initial_storage(
            metadata = sp.big_map(self.normalize_metadata(metadata))
        )

        if self.config.support_upgradable_metadata:
            def update_metadata(self, key, value):
                """
                    An entry-point to allow the contract metadata to be updated.
                    Can be removed with `FA12_config(support_upgradable_metadata = False, ...)`
                """
                sp.verify(self.is_administrator(sp.sender), FA12_Error.)
                self.data.metadata[key] = value
            self.update_metadata = sp.entry_point(update_metadata)

class FA12(
    FA12_mint_burn,
    FA12_administrator,
    FA12_token_metadata,
    FA12_contract_metadata,
    FA12_core
):
    def __init__(self, admin, config, token_metadata = None, contract_metadata = None):

        FA12_core.__init__(self, config, administrator = admin, exchangeAddress = admin)

        if token_metadata is None and contract_metadata is None:
            raise Exception(
            """\n
                Contract must contain at least of the following:
                    \t- TZIP-016 %metadata big-map,
                    \t- Token-specific-metadata through the %token_metadata big-map
                More info: https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-7/tzip-7.md#token-metadata
            """
            )

        self.usingTokenMetadata = False
        if token_metadata is not None:
            self.usingTokenMetadata = True
            self.set_token_metadata(token_metadata)
        if contract_metadata is not None:
            self.set_contract_metadata(contract_metadata)
        self.generate_tzip16_metadata()

class Viewer(sp.Contract):
    def __init__(self, t):
        self.init(last = sp.none)
        self.init_type(sp.TRecord(last = sp.TOption(t)))
    @sp.entry_point
    def target(self, params):
        self.data.last = sp.some(params)
class TestOffchainView(sp.Contract):
    def __init__(self, f):
        self.f = f.f
        self.init(result = sp.none)

    @sp.entry_point
    def compute(self, data, params):
        b = sp.bind_block()
        with b:
            self.f(sp.record(data = data), params)
        self.data.result = sp.some(b.value)

if "templates" not in __name__:
    @sp.add_test(name = "FA12")
    def test():

        sp.add_compilation_target(
        "FA1_2",
        FA12(
            admin   = sp.address("tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm"),
            config  = FA12_config(
                support_upgradable_metadata         = True,
                use_token_metadata_offchain_view    = True
            ),
            token_metadata = {
                "decimals"    : "6",             
                "name"        : "NCU Coin",
                "symbol"      : "NCU",            
                "icon"        : 'https://raw.githubusercontent.com/CollegeNetwork/main/NCUCoin.jpeg'
            },
            contract_metadata = {
                "" : "ipfs://QmdpUPMMX8RLuE2WJxxNqwgU9ELsg7iYPZKSuCWJvfQnVM",
            }
        )
    )