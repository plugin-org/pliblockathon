import smartpy as sp

FA12 = sp.io.import_stored_contract("Ready to deploy FA12")

class Coin(FA12.FA12):
    pass

class NCUCoinCrowdsale(sp.Contract):
    def __init__(self,_admin,_tokenAddress):   
        self.init(
            # contract's storage
            admin = _admin,
            paused = sp.bool(False),
            tokenAddress = _tokenAddress,

            claimPeriod = sp.int(0),  #no. of seconds after which same user can claim token
            claimAmount = sp.nat(200000000), #amount of token user can claim in one time
         
            #to store deanslist student
            deans = sp.big_map(
                tkey = sp.TAddress,
                tvalue = sp.TNat, #no. of claims left
            ),

            #to store address of student DB
            student = sp.big_map(
                tkey = sp.TAddress,
                tvalue =  sp.TRecord(
                lastClaim = sp.TTimestamp ,
                claimedVal = sp.TNat,
                ),
            ),

            metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "NcuCoin Distributor" , "description : Distributor contract for NCUCoin to disburse tokens to students" , "admin" : "tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm" , "author" : "pichkari&gamma" , "homepage" : "https://ncucoin.netlify.app/"}"""),
        })
        
        )

    def checkAdmin(self):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")
    
    def checkPaused(self):
        sp.verify(self.data.paused == False, message= "Minting is Paused")
    
    @sp.entry_point
    def updateAdmin(self , address):
        sp.set_type(address , sp.TAddress)
        self.checkAdmin()
        self.data.admin = address

    @sp.entry_point
    def updateToken(self , address):
        self.checkAdmin()
        self.data.tokenAddress = address

    @sp.entry_point
    def updateTime(self , time):
        sp.set_type(time , sp.TInt)
        self.checkAdmin()
        self.data.claimPeriod = time

    @sp.entry_point
    def updateAmount(self , amt):
        sp.set_type(amt , sp.TNat)
        self.checkAdmin()
        self.data.claimAmount = amt

    @sp.entry_point
    def togglePause(self):
        self.checkAdmin()
        self.data.paused = ~self.data.paused

    @sp.entry_point
    def claimSemestralAllowance(self):
        #checks before we mint
        self.checkPaused()

        # Whitelist check
        sp.verify(self.data.student.contains(sp.sender) , message = "Sender is not a verified student")
        sp.verify( self.data.student[sp.sender].lastClaim.add_seconds(self.data.claimPeriod) <= sp.now , message = "Too early since last claim")
    

        #mint and send it to addy
        mintParam = sp.record(address = sp.sender, value = self.data.claimAmount,)

        mintHandle = sp.contract(
            sp.TRecord(address = sp.TAddress, value = sp.TNat),
            self.data.tokenAddress,
            "mint"
            ).open_some()

        sp.transfer(mintParam, sp.mutez(0), mintHandle)

        #Update values
        self.data.student[sp.sender].claimedVal += self.data.claimAmount
        self.data.student[sp.sender].lastClaim = sp.now 

    @sp.entry_point
    def claimDeanListAllowance(self):
        #checks before we mint
        self.checkPaused()

        # Whitelist check
        sp.verify(self.data.deans.contains(sp.sender) , message = "Sender is not a Dean List student")
        sp.verify( self.data.deans[sp.sender]  > 0 , message = "No Claims Left")

        #mint and send it to addy
        mintParam = sp.record(
            address = sp.sender, 
            value = self.data.claimAmount,
        )

        mintHandle = sp.contract(
            sp.TRecord(address = sp.TAddress, value = sp.TNat),
            self.data.tokenAddress,
            "mint"
            ).open_some()

        sp.transfer(mintParam, sp.mutez(0), mintHandle)

        #Update values
        self.data.deans[sp.sender] = sp.as_nat(self.data.deans[sp.sender] - 1)

    @sp.entry_point
    def addStudent(self , studentAddress):
        sp.set_type(studentAddress, sp.TAddress)
        #checks before we mint
        self.checkPaused()
        self.checkAdmin()

        #check if student already exists
        sp.verify((self.data.student.contains(studentAddress))==False , message = "Student Already Exists")

        self.data.student[studentAddress] = sp.record(lastClaim = sp.now ,claimedVal = sp.nat(0))

    @sp.entry_point
    def addDeansStudent(self , studentAddress):
        sp.set_type(studentAddress , sp.TAddress)
        #checks before we mint
        self.checkPaused()
        self.checkAdmin()
        
        sp.if self.data.deans.contains(studentAddress) :
            self.data.deans[studentAddress] +=1
        sp.else:
            self.data.deans[studentAddress] = 1

    @sp.entry_point
    def removeStudent(self , studentAddress):
        sp.set_type(studentAddress , sp.TAddress)
        #checks before we mint
        self.checkPaused()
        self.checkAdmin()
        
        sp.if self.data.student.contains(studentAddress) :
            del self.data.student[studentAddress]
      


@sp.add_test("NCUCoinCrowdsale")
def test():

    #update ipfs
    admin = sp.test_account("admin")
    bob = sp.test_account("bob")
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

    scenario += coin

    distributor = NCUCoinCrowdsale(
        _admin = admin.address,
        _tokenAddress = coin.address,
        )

    scenario+= distributor

    # coin.setAdministrator(distributor.address).run(sender = alice)
    coin.updateExchangeAddress(distributor.address).run(sender = admin)

    distributor.addStudent(bob.address).run(sender=admin)
    distributor.claimSemestralAllowance().run(sender=bob)
    distributor.claimSemestralAllowance().run(sender=udit , valid = False)

    distributor.addDeansStudent(bob.address).run(sender=admin)
    # distributor.addDeansStudent(bob.address).run(sender=admin)

    distributor.claimDeanListAllowance().run(sender = bob)
    distributor.claimDeanListAllowance().run(sender = bob , valid = False)

    # distributor.addStudent(bob.address).run(sender=admin , valid = False)
    # distributor.removeStudent(bob.address).run(sender=admin)
    # distributor.claimSemestralAllowance().run(sender=bob , valid = False)


    distributor.updateAmount(100000000).run(sender=admin)
    distributor.updateTime(10).run(sender=admin)
    distributor.claimSemestralAllowance().run(sender=bob , now = sp.timestamp(10) , valid = True)
    distributor.claimSemestralAllowance().run(sender=bob , now = sp.timestamp(20) , valid = True)


    sp.add_compilation_target("CoinDistributor", NCUCoinCrowdsale(
        _admin = sp.address("tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm"),
        _tokenAddress = sp.address("KT1AefyQpVfjupNFKBoKqrVHtHnCSZ7AKBtX"),
        ))
