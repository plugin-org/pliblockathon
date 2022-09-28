import smartpy as sp

FA2 = sp.io.import_stored_contract("modifiedNFT")
FA12 = sp.io.import_stored_contract("Ready to deploy FA12")

class coin(FA12.FA12):
    pass

class NFT(FA2.FA2):
    pass

class CanteenNFT(sp.Contract):
    FA2MintParam = sp.TRecord(
        address = sp.TAddress,
        amount = sp.TNat,
        metadata = sp.TMap(sp.TString, sp.TBytes),
        token_id = sp.TNat,
    )
    def __init__(self,_admin,_developer,_canteenWallet, _tokenAddress ,_libraryAddress ):   
        self.init(
            # contract's storage
            admin = _admin,
            developer = _developer,
            canteenWallet = _canteenWallet,
            tokenAddress = _tokenAddress,
            libraryAddress = _libraryAddress,
            paused = sp.bool(False),
            prices = sp.big_map(
                tkey = sp.TNat,
                tvalue = sp.TNat,
            ),
            tokenId=sp.nat(0),
            fa2 = sp.none,
            # metadata = sp.big_map({
            # "": sp.utils.bytes_of_string("tezos-storage:content"),
            # "content": sp.utils.bytes_of_string("""{"name": "Plenty Discord NFT" , "description : Crowdsale Contract that mints NFTs via Plenty Discord Bot" , "admin" : "tz1X7EJX7Q2oBjM2Hur53qmB6yCJmPxttT3h" , "author" : "pichkari&gamma" , "homepage" : "https://tarunsh.com/"}"""),
        # })
        
        )

    def TransferFATwoTokens(sender,receiver,amount,tokenAddress,id):
        """Transfers FA2 tokens
        
        Args:
            sender: sender address
            receiver: receiver address
            amount: amount of tokens to be transferred
            tokenAddress: address of the FA2 contract
            id: id of token to be transferred
        """

        arg = [
            sp.record(
                from_ = sender,
                txs = [
                    sp.record(
                        to_         = receiver,
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
        """Transfers FA1.2 tokens
        
        Args:
            sender: sender address
            reciever: reciever address
            amount: amount of tokens to be transferred
            tokenAddress: address of the FA1.2 contract
        """

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

    def checkAdmin(self):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")
    
    def checkPaused(self):
        sp.verify(self.data.paused == False, message= "Minting is Paused")

    @sp.entry_point
    def updateAdmin(self , address):
        self.checkAdmin()
        self.data.admin = address

    @sp.entry_point
    def updateCanteen(self , address):
        self.checkAdmin()
        self.data.canteenWallet = address
    
    @sp.entry_point
    def updateToken(self , address):
        self.checkAdmin()
        self.data.tokenAddress = address
    
    @sp.entry_point
    def updateLibrary(self , address):
        self.checkAdmin()
        self.data.admin = address
    
    @sp.entry_point
    def registerFA2(self, fa2):
        self.checkAdmin()
        self.data.fa2 = sp.some(fa2)

    @sp.entry_point
    def togglePause(self):
        self.checkAdmin()
        self.data.paused = ~self.data.paused

    @sp.entry_point
    def addFood(self , params):
        # sp.set_type(params, sp.TRecord(price = sp.TNat , metadata = sp.big_map(tkey = sp.TString , tvalue= sp.TBytes)))
        #checks before we mint
        self.checkPaused()
        self.checkAdmin()

        #mint and send it to addy
        mintData = sp.record(
            address = sp.sender,
            amount = sp.nat(1),
            metadata = params.metadata,
            token_id = self.data.tokenId,
        )
        contract = sp.contract(
            self.FA2MintParam,
            self.data.fa2.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'mint'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(mintData, sp.mutez(0), contract)

        # update
        self.data.prices[self.data.tokenId] = params.price
        self.data.tokenId +=1
        

    @sp.entry_point
    def mintFood(self , params):
        sp.set_type(params, sp.TRecord(tokenId = sp.TNat))
        #checks before we mint
        self.checkPaused()
        # Deduct Cost
      
        CanteenNFT.TransferFATokens(sp.sender , self.data.canteenWallet , self.data.prices[params.tokenId] , self.data.tokenAddress)

        #mint and send it to addy
        mintData = sp.record(
            address = sp.sender,
            amount = sp.nat(1),
            metadata = {},
            token_id = params.tokenId,
        )
        contract = sp.contract(
            self.FA2MintParam,
            self.data.fa2.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'mint'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(mintData, sp.mutez(0), contract)


    @sp.entry_point
    def burnFood(self , params):
        sp.set_type(params, sp.TRecord(tokenId = sp.TNat , amount = sp.TNat))
        #checks before we mint
        self.checkPaused()

        
        # Transfer NFT to canteen
        CanteenNFT.TransferFATwoTokens(sp.sender, self.data.canteenWallet ,params.amount, self.data.fa2.open_some() ,params.tokenId)

    @sp.entry_point
    def payFine(self , amount):
        self.checkPaused()

        CanteenNFT.TransferFATokens(sp.sender , self.data.libraryAddress , amount , self.data.tokenAddress)

@sp.add_test("Canteen")
def test():

    #update ipfs
    admin = sp.test_account("admin")
    bob = sp.test_account("bob")
    wallet = sp.test_account("wallet")
    udit = sp.test_account("udit")

    scenario = sp.test_scenario()

    coin = FA12.FA12(
            admin   = admin.address,
            config  = FA12.FA12_config(
                support_upgradable_metadata         = True,
                use_token_metadata_offchain_view    = True
            ),
            token_metadata = {
                "decimals"    : "6",             # Mandatory by the spec
                "name"        : "NCU Coin", # Recommended
                "symbol"      : "NCU",            # Recommended
                # Extra fields
                "icon"        : 'https://raw.githubusercontent.com/Udit-Kapoor/CollegeNetwork/main/NCUCoin.jpeg'
            },
            contract_metadata = {
                "" : "ipfs://QmdpUPMMX8RLuE2WJxxNqwgU9ELsg7iYPZKSuCWJvfQnVM",
            }
        )

    scenario+= coin

    canteen = CanteenNFT(
        _admin = admin.address,
        _developer = bob.address , 
        _canteenWallet = wallet.address,
        _tokenAddress = coin.address,
        _libraryAddress = udit.address,
        )
    scenario+=canteen

    token = NFT(
        config = FA2.FA2_config(
            non_fungible=False,
            assume_consecutive_token_ids = False
        ),
        admin = admin.address,
        crowdsale = canteen.address,
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Plenty NFT Contract", "description": "NFT contract for the Plenty Discord Bot"}"""),
        })
    )
    
    scenario += token


    scenario.h2("Registering FA2 contract for our crowdsale.")
    canteen.registerFA2(token.address).run(sender=admin)

    params = sp.record( price = sp.nat(5000000), metadata = sp.map({"" : sp.utils.bytes_of_string("ipfs://QmSscmKnfMkYFKjrubbmrPUdkhATC4gZHktRRamCGyNN3G/2.json")}))
    canteen.addFood(params).run(sender = admin)

    coin.mint(address = bob.address, value = 100000000000).run(sender=admin)
    coin.approve(spender = canteen.address, value = 5000000 ).run(sender = bob)

    params = sp.record(tokenId = sp.nat(0))
    canteen.mintFood(params).run(bob)

    coin.approve(spender = canteen.address, value = 5000000 ).run(sender = bob)
    canteen.mintFood(params).run(bob)

    coin.approve(spender = canteen.address, value = 5000000 ).run(sender = bob)
    canteen.mintFood(params).run(bob)

    coin.mint(address = udit.address , value = 10000000).run(sender=admin)
    coin.approve(spender=canteen.address , value = 4000000).run(sender=udit)
    canteen.mintFood(params).run(sender=udit , valid = False)


    params = sp.record( price = sp.nat(10000000), metadata = sp.map({"" : sp.utils.bytes_of_string("ipfs://QmSscmKnfMkYFKjrubbmrPUdkhATC4gZHktRRamCGyNN3G/3.json")}))
    canteen.addFood(params).run(sender = admin)

    token.update_operators([
                sp.variant("add_operator", token.operator_param.make(
                    owner = bob.address,
                    operator = canteen.address,
                    token_id = 0
                ))
            ]).run(sender = bob, valid = True)

    params = sp.record(tokenId = sp.nat(0) , amount = sp.nat(1))
    canteen.burnFood(params).run(sender=bob)

    coin.approve(spender = canteen.address , value = 1200000).run(sender=bob)
    canteen.payFine(sp.nat(1200000)).run(sender=bob)



    #Compilation

    admin = sp.address("tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm")

    sp.add_compilation_target("Canteeeen", CanteenNFT(
        _admin = admin,
        _developer = sp.address("tz1LvMXNaVcq1Zjz7zxjF8NJPTu1oQ6vf2Qf") , 
        _canteenWallet = sp.address("tz1VdqimZ3DQGKkE3oB8mVn62qhuvm3GeJiS"),
        _tokenAddress = sp.address("KT1AefyQpVfjupNFKBoKqrVHtHnCSZ7AKBtX"),
        _libraryAddress = sp.address("tz1NhKzAZkzB1SExnt1ECtfvuGE6n5VSLctL"),
        ))

    # update after deploying crowdsale first
    crowdsale = sp.address("KT1RPeo9eQ4inwmvPC6Ma3SWVe3rGeBuc4S4")

    sp.add_compilation_target("Token", NFT(
        config = FA2.FA2_config(
            non_fungible= False,
            assume_consecutive_token_ids = False
        ),
        admin = admin,
        crowdsale = crowdsale,
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "NCU Canteen NFT" , "description : A FA2 Contract that stores the NFT's minted for Canteen" , "version" : "FA2" , "author" : "pichkari&gamma" , "homepage" : "https://ncucoin.netlify.app/" , "interfaces" : "https://gitlab.com/tezos/tzip/-/tree/master/proposals/tzip-16" }"""),
        })
    ))

