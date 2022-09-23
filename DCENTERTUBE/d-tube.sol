// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract DcenterTube{
      struct tutor{
        string subjectName;
        string tutorName;
        address payable seller;
        uint price;
        address buyer;
        bool recieved;
        uint productid;
        uint passcode;
      }
      tutor[] public data;
      address payable manager;
      constructor(){
           manager=payable(msg.sender);
      }
      bool destroyed = false;
      modifier destroycontract(){
           require(!destroyed,"this contract does not exist");
           _;
      }
      uint count=1;
      event register(string ProductName,uint ProductId,address selleraddress);
      event buyer(address SellerAddress,uint ProductId);
      event delivered(uint ProductId,bool status);
      function Register(string memory _productname,string memory _sellername, uint _price,uint _passcode) public destroycontract{
          require(_price>0,"product price must be greater than zero");
          tutor memory p1;
          p1.subjectName=_productname;
          p1.tutorName=_sellername;
          p1.seller=payable(msg.sender);
          p1.price=_price*10**18;
          p1.productid=count;
          p1.passcode=_passcode;
          count++;
          data.push(p1);
          emit register(p1.subjectName,p1.productid,msg.sender);
     }
     function buy(uint _productid) payable public destroycontract{
          require(data[_productid-1].price==msg.value,"pay the exact amaount");
          require(data[_productid-1].seller!=msg.sender,"seller cannot bet the buyer ");
          data[_productid-1].buyer==msg.sender;
          emit buyer(msg.sender,_productid);
     }
     function delivery(uint _productid) public destroycontract{
         require(data[_productid-1].buyer==msg.sender,"only buyer can confirm");
         data[_productid-1].recieved=true;
          data[_productid-1].seller.transfer(data[_productid-1].price);
          emit delivered(_productid, data[_productid-1].recieved);
     }
     function Destroycontract() payable public destroycontract{
          require(manager==msg.sender);
          selfdestruct(manager);
           manager.transfer(address(this).balance);
           destroyed=true;
     }
}