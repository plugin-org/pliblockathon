var MongoClient = require('mongodb').MongoClient;
//const murl = "mongodb+srv://pasumongo:pasumongo1720@cluster-v1.imwbj.mongodb.net/pasudbv1?retryWrites=true&w=majority";
const murl = "mongodb://localhost:27017/DocFlow?retryWrites=true&w=majority";

let db, cachedDb;

module.exports = {
	getDb: async function() {

		await new Promise((resolve, reject) => {

			if(cachedDb)
			{
				resolve();
			}
			else
			{
				MongoClient.connect(murl,{useNewUrlParser:true, useUnifiedTopology:true}, async function(error, client){
					if(error)
					{
						reject(error);
					}
					else{
						db = await client.db("DocFlow");
						cachedDb=db;
						resolve();
					}
				});
			}
			
			return db;

		});
		return db;
	}

};

