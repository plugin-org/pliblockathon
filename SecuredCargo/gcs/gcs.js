'use strict';

const {Storage} = require('@google-cloud/storage');
const crypto = require('crypto');
var path = require('path')

const storage = new Storage({keyFilename: "gcs/key.json"});
const bucket = storage.bucket('chainstore77');

class gcs 
{
	static uploadFile(id, FileInput) {
		return new Promise((resolve, reject) => {
			try {
				const FileExt = path.extname(FileInput.originalname);
				//const FileName = id+"."+FileExt;
				const FileName = id;
				//const blob = bucket.file(FileName);
				const blob = bucket.file('docflow/'+FileName);
				const contentType = FileInput.mimetype;
				
				const writeoption = {contentType: contentType};

				const blobStream = blob.createWriteStream(writeoption);

				const hash = crypto.createHash('sha256').update(FileInput.buffer);
				var hash_hex = hash.digest('hex')
			  
				blobStream.on('error', error => {
					reject(error);
				});

				blobStream.on('finish', () => {
					const gcsStatus = {uploadStatus:true, FileExt:FileExt, contentType:contentType, FileHash:hash_hex};
					resolve(gcsStatus);
				});

				blobStream.end(FileInput.buffer);
			} catch (error) {
				reject(error);
			}
		})
	}

	static readFile(FileName, FileHash) {
		return new Promise((resolve, reject) => {
			try {
				//const blob = bucket.file(FileName);
				const blob = bucket.file('docflow/'+FileName);
				var bufs = [];
				
				blob.createReadStream()
				.on('error', function(error) {
					reject('Unable to load file');
				})
				.on('data', function(data){ 
					bufs.push(data);
				})
				.on('end', function() {
					const buf = Buffer.concat(bufs);
					const hash = crypto.createHash('sha256').update(buf);
					var FileHash_Current = hash.digest('hex');
					if(FileHash_Current == FileHash){
						resolve(buf);
					}
					else {
						reject('File Hash did not match');
					}
				});
				
			} catch (error) {
				reject('Unable to load file');
			}
		})
	}

}

module.exports = gcs;

