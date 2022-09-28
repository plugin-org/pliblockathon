var express = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongo = require('./db/db');
var db;
var ObjectId = require('mongodb').ObjectID;
const google = require('@googleapis/healthcare');
const {GoogleAuth} = require('google-auth-library');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'kriya/views'));
app.use('/public', express.static(__dirname + '/kriya/public'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({secret:"Mindcare"}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(async (req, res, next) => {
	
	if(req.url == "/privacy" || req.url == "/app")
	{
		next();
		return;
	}
	else
	{
		await mongo.getDb()
		.then(function(thisdb) {
			db=thisdb;
			req.db = thisdb;
		})
		.catch((error) => {
			return res.send("DB Connection error");
		})

		next();
	}
});

app.get('/', function (req, res) {
	res.render("home");
})


app.get('/login', function (req, res) {
	var msg = {msgtype:'',msgid:'',des:''};
	var data = {msg:msg};
	res.render("login",{data:data});
})


app.post('/login', function (req, res) {

	var EmailID = req.body.txtEmailID;
	var Password = req.body.txtPassword;
	
	var DataRequest = [];
	DataRequest.push(db.collection("User").findOne({"EmailID":EmailID, "Password":Password},{ 'projection':{_id:1} }));
	Promise.all(DataRequest).then(async function (results) {
		if(results[0])
		{
			req.session.UserID=results[0]._id;
			var data={};
			res.render("menu",{data:data});
		}
		else
		{
			var msg = {msgtype:'',msgid:'kriya',des:'Email ID or Password is not valid. Please try again.'};
			var data = {msg:msg};
			res.render("login",{data:data});
		}
	});

})


app.get('/menu', function (req, res) {
	var msg = {msgtype:'',msgid:'',des:''};
	var data = {};
	res.render("menu",{data:data, msg:msg});
})


app.get('/logout', function (req, res) {
	req.logout();
	var msg = {msgtype:'',msgid:'',des:''}
	res.render("logout",{msg:msg});
})


app.get('/message', function (req, res) {
	//var msg = {};
	res.render("message",{msg:msg});
})


app.get('/checkemail', function (req, res) {
	var msg = {msgtype:'',msgid:'',des:''}
	var data = {msg:msg};
	res.render("checkemail",{data:data});
})


app.post('/checkemail', function (req, res) {

	var EmailID = req.body.txtEmailID;
	var DataRequest = [];
	DataRequest.push(db.collection("User").findOne({"EmailID":EmailID},{ 'projection':{_id:1} }));
	Promise.all(DataRequest).then(async function (results) {
		if(results[0])
		{
			var msg = {msgtype:'',msgid:'kriya',des:'Your EmailID already exists with us. Try logging in with your EmailID'};
			var data = {EmailID:EmailID, msg:msg};
			res.render("checkemail",{data:data});
		}
		else
		{
			//var FHIRID="kriya-"+uuidv4();
			var data = {EmailID:EmailID};
			res.render("register",{data:data});
		}
	}).catch(function (error) {
		var MobileNo = req.body.txtMobileNo;
		var data = {UserID:MobileNo, MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to reach server. Contact Support."}
		res.render("message",{data:data});
	});
				
})


app.post('/register', function (req, res) {

	try{
		var EmailID = req.body.txtEmailID;
		var Password = req.body.txtPassword;
		//var FHIRID = req.body.txtFHIRID;
		var FullName = req.body.txtFullName;
		var WalletID = req.body.txtWalletID;

		var DataObj = {EmailID:EmailID, Password:Password, FullName:FullName, WalletID:WalletID, CreatedAt:new Date(), UpdatedAt:new Date()};
		db.collection("User").insertOne(DataObj, function(error, result) {
			if(error)
			{
				var data = {MessageType:"M01", MessageNo:"REG002", MessageDes:"Unable to reach server. Contact Support."}
				res.render("message",{data:data});
			}
			else
			{
				req.session.UserID=result.insertedId;
				var data = {MessageType:"M01", MessageNo:"REG001", MessageDes:"You are successfully registered with us. Now you can buy and sell mental health services across the globe."}
				res.render("message",{data:data});
			}
		});
		
	}
	catch(error)
	{
		console.log(error);
		res.send()
	}
	
})


app.get('/populatedata', function (req, res) {

	if(req.session.UserID)
	{
		try
		{
			UserID = req.session.UserID;
			var DataRequest = [];
			DataRequest.push(db.collection("User").findOne({_id:ObjectId(UserID)},{ 'projection':{_id:1, FHIRID:1, FullName:1, WalletID:1} }));
			Promise.all(DataRequest).then(async function (results) {
				if(results[0])
				{
					var FHIRID = results[0].FHIRID;
					var FullName = results[0].FullName;
					var WalletID = results[0].WalletID;
					
					var msg={};
					var data = {FHIRID:FHIRID, FullName:FullName, WalletID:WalletID, msg:msg};
					res.render("populatedata",{data:data});
					
				}
				else
				{
					var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Something wend wrong. Contact support."}
					res.render("message",{data:data});
				}
			}).catch(function (error) {
				var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to reach server. Contact Support."}
				res.render("message",{data:data});
			});
		}
		catch(error) {
			var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to reach server. Contact Support."}
			res.render("message",{data:data});
		}
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/populatedata', async function (req, res) {

	var FHIRID = req.body.hdnFHIRID;
	var FullName = req.body.hdnFullName;
	var WalletID = req.body.hdnWalletID;

	if(req.session.UserID)
	{
		try{
			const healthcare = google.healthcare({
				version: 'v1',
				auth: new google.auth.GoogleAuth({
					keyFile: path.join(__dirname, '/fhirapi/key.json'),
					scopes: ['https://www.googleapis.com/auth/cloud-platform'],
				}),
				headers: {'Content-Type': 'application/fhir+json'},
			});

			const body = {
				id:FHIRID,
				name: [{use: 'official', family: '', given: [FullName]}],
				gender: 'female',
				birthDate: '1970-01-01',
				resourceType: 'Patient',
				"extension": [
					{
						"url": "walletid",
						"valueString": WalletID
					}
				]
			};

			const name = "projects/api-project-870463672463/locations/asia-south1/datasets/fhirdataset01/fhirStores/fhirdatastore01/fhir/Patient/"+FHIRID;
			const request = {name, requestBody: body};
			
			const response = await healthcare.projects.locations.datasets.fhirStores.fhir.update(request);

			if(response.status == 200 || response.status == 201)
			{
				var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your FHIR data has been successfully populated"}
				res.render("message",{data:data});
			}
			else
			{
				var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to populate FHIR data."}
				res.render("message",{data:data});
			}	
		}
		catch(error) {
			var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to populate FHIR data."}
			res.render("message",{data:data});
		}
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}
	
})
	

app.get('/buytokens', function (req, res) {

	if(req.session.UserID)
	{
		res.render("buytokens");
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}
	
})


app.get('/tokenhash', function (req, res) {
	
	if(req.session.UserID)
	{
		var hash = req.query.hash;
		var data = {hash:hash};
		res.render("tokenhash",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/searchPHR', function (req, res) {

	if(req.session.UserID)
	{
		var data = {FormPost:false};
		res.render("searchPHR",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/searchPHR', async function (req, res) {
	
	if(req.session.UserID)
	{
		var PatientName = req.body.txtPatientName;

		const auth = new GoogleAuth({
		  keyFile: path.join(__dirname, '/fhirapi/key.json'),
		  scopes: 'https://www.googleapis.com/auth/cloud-platform',
		});

		const url = 'https://healthcare.googleapis.com/v1/projects/api-project-870463672463/locations/asia-south1/datasets/fhirdataset01/fhirStores/fhirdatastore01/fhir/Patient/_search';
		const params = {'name:contains' : PatientName};
		const client = await auth.getClient();
		const response = await client.request({url, method: 'POST', params});

		var FHIRData=[];
		if(response.data.entry)
		{
			FHIRData = await response.data.entry;
		}

		var data = {FormPost:true, PatientName:PatientName, FHIRData:FHIRData};
		res.render("searchPHR",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/preparePHROrder', function (req, res) {

	if(req.session.UserID)
	{
		try	{
			const checkToBuy = req.body.checkToBuy;
			const PatientName = req.body.txtPatientName;
			const OrderID = "phr-"+uuidv4();
			const Search = {'name:contains':PatientName}

			var ToBuyArray = [];
			
			if(Array.isArray(checkToBuy))
			{
				var ToBuyArray=checkToBuy;
			}
			else
			{
				ToBuyArray.push(checkToBuy);
			}
		
			var WalletIDs = [];
			var FHIRIDs = [];
			
			for(var i=0; i<ToBuyArray.length; i++)
			{
				var IDs = ToBuyArray[i];
				var IDsArray = IDs.split('|');
				FHIRIDs.push(IDsArray[0]);
				WalletIDs.push(IDsArray[1]);
			}

			const OrderedBy = req.session.UserID;
			const OrderDescription = "PHR Data";
			
			const OrderJSON = {
				OrderID : OrderID,
				OrderedBy : OrderedBy,
				OrderDescription : OrderDescription,
				Search : Search,
				WalletIDs : WalletIDs,
				FHIRIDs : FHIRIDs
			};
			
			var PHRCount = ToBuyArray.length;
			var TotalToken = PHRCount*1;

			var DataObj = {_id:OrderID, OrderedBy:OrderedBy, OrderType:'PHR', OrderDescription:OrderDescription, OrderJSON:OrderJSON, OrderDate:new Date(), OrderStatus:'P'};
			db.collection("Order").insertOne(DataObj, function(error, result) {
				if(error)
				{
					var data = {MessageType:"M01", MessageNo:"REG002", MessageDes:"Unable to reach server. Contact Support."}
					res.render("message",{data:data});
				}
				else
				{
					var data = {PHRCount:PHRCount, TotalToken:TotalToken, OrderJSON:OrderJSON};
					res.render("buyPHRData",{data:data});
				}
			});
			
		}
		catch(error) {
			var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Unable to reach server. Contact Support."}
			res.render("message",{data:data});
		}

	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/PHROrderConfirm', async function (req, res) {
	
	if(req.session.UserID)
	{
		var Hash = req.body.hdnHash;
		var OrderID = req.body.hdnOrderID;
		var OrderHash = req.body.hdnOrderHash;

		db.collection("Order").updateOne({_id:OrderID}, {$set: {OrderHash:OrderHash, OrderStatus:'C'} }, function(error, result) {
			if(error)
			{
				var data = {MessageType:"M01", MessageNo:"", MessageDes:"Unable to reach server. Please try after sometime."}
				res.render("message",{data:data});
			}
			else
			{
				var data = {OrderID:OrderID, Hash:Hash};
				res.render("PHROrderConfirm",{data:data});
			}
		});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/myOrders', async function (req, res) {
	
	if(req.session.UserID)
	{
		var UserID = req.session.UserID;

		var DataRequest = [];
		DataRequest.push(db.collection("Order").find({OrderedBy:UserID}).sort({OrderDate:1}).toArray());
		Promise.all(DataRequest).then(function (results) {
			const OrderList = results[0];
			var data = {OrderList:OrderList};
			res.render("myOrders",{data:data});
		}).catch(function (error) {
			var data = {MessageType:"M01", MessageNo:"", MessageDes:"Unable to reach server. Please try after sometime."}
			res.render("message",{data:data});
		});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/DownloadPHRData', async function (req, res) {
	
	if(req.session.UserID)
	{
		var OrderID = req.query.OrderID;

		var DataRequest = [];
		DataRequest.push(db.collection("Order").findOne({_id:OrderID},{ 'projection':{_id:1, OrderJSON:1} }));
		Promise.all(DataRequest).then(async function (results) {
			const OrderJSON = results[0].OrderJSON;
			var FHIRIDs = OrderJSON.FHIRIDs.join();

			const auth = new GoogleAuth({
			  keyFile: path.join(__dirname, '/fhirapi/key.json'),
			  scopes: 'https://www.googleapis.com/auth/cloud-platform',
			});

			const url = 'https://healthcare.googleapis.com/v1/projects/api-project-870463672463/locations/asia-south1/datasets/fhirdataset01/fhirStores/fhirdatastore01/fhir/Patient/_search';
			const params = {'_elements':'identifier,name,extension', '_id':FHIRIDs};
			const client = await auth.getClient();
			const response = await client.request({url, method: 'POST', params});

			var FHIRData=[];
			if(response.data.entry)
			{
				FHIRData = await response.data.entry;
			}

			res.setHeader('Content-disposition', 'attachment; filename=phrdata.json');
			res.setHeader('Content-type', 'application/json');
			res.send(FHIRData);
		
		}).catch(function (error) {
			console.log(error);
			var data = {MessageType:"M01", MessageNo:"", MessageDes:"Unable to reach server. Please try after sometime."}
			res.render("message",{data:data});
		});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/services', async function (req, res) {
	
	if(req.session.UserID)
	{
		var data = {};
		res.render("services",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/counselling', async function (req, res) {
	
	if(req.session.UserID)
	{
		var data = {};
		res.render("counselling",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/counsellingservices', async function (req, res) {
	
	if(req.session.UserID)
	{
		var data = {};
		res.render("counsellingservices",{data:data});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/buyService', async function (req, res) {
	
	if(req.session.UserID)
	{
		const OrderedBy = req.session.UserID;
		const OrderID = uuidv4();
		const TotalToken = req.body.hdnTotalToken;
		const OrderDescription = req.body.hdnOrderDescription;
		
		const OrderJSON = {
			OrderID : OrderID,
			OrderedBy : OrderedBy,
			OrderDescription : OrderDescription,
		};

		var DataObj = {_id:OrderID, OrderedBy:OrderedBy, OrderType:'GEN', OrderDescription:OrderDescription, OrderJSON:OrderJSON, OrderDate:new Date(), OrderStatus:'P'};
		db.collection("Order").insertOne(DataObj, function(error, result) {
			if(error)
			{
				var data = {MessageType:"M01", MessageNo:"REG002", MessageDes:"Unable to reach server. Contact Support."}
				res.render("message",{data:data});
			}
			else
			{
				var data = {TotalToken:TotalToken, OrderJSON:OrderJSON};
				res.render("buyService",{data:data});
			}
		});

	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.post('/OrderConfirm', async function (req, res) {
	
	if(req.session.UserID)
	{
		var Hash = req.body.hdnHash;
		var OrderID = req.body.hdnOrderID;
		var OrderHash = req.body.hdnOrderHash;

		db.collection("Order").updateOne({_id:OrderID}, {$set: {OrderHash:OrderHash, OrderStatus:'C'} }, function(error, result) {
			if(error)
			{
				var data = {MessageType:"M01", MessageNo:"", MessageDes:"Unable to reach server. Please try after sometime."}
				res.render("message",{data:data});
			}
			else
			{
				var data = {OrderID:OrderID, Hash:Hash};
				res.render("OrderConfirm",{data:data});
			}
		});
	}
	else
	{
		var data = {MessageType:"M01",MessageNo:"LGRQ001", MessageDes:"Your session is expired. Please login again."}
		res.render("message",{data:data});
	}

})


app.get('/testweb3', async function (req, res) {
	
	var data = {};
	res.render("testweb3",{data:data});

})


module.exports = app;

