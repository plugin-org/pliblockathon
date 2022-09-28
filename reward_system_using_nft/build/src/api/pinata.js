import axios from 'axios'
import { mintAchievement } from './operations/achievement';


const jsonToPinata = async (json) =>  {

    try {

        const data = JSON.stringify(json);

        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
              'Content-Type': 'application/json', 
              pinata_api_key: 'c98008ccad0a8398468f',
              pinata_secret_api_key: 'b925e8a94f1aa1dbb8bd85a376ac527847daa4d3bd3a37aaa2e84e83c905d19e',
            },
            data : data
          };
          
          const res = await axios(config);
          


        return{
            sucess : true,
            Ipfs : res.data.IpfsHash,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            Ipfs : "",
        };
        
    }

}

export const pinataWrapper = async (wallet, id , obj) =>  {

    try {

        let data = {};

        if(id === 1){
            // certi
            data.name = obj.name;
            data.description = obj.description;
            data.artifactUri = "ipfs://QmYqP7BnS2cPjkzk1QnovUvFw8oW2ZMiGf9X1XjvgNemr8";
            data.displayUri = "ipfs://QmYqP7BnS2cPjkzk1QnovUvFw8oW2ZMiGf9X1XjvgNemr8";
            data.thumbnailUri = "ipfs://QmYqP7BnS2cPjkzk1QnovUvFw8oW2ZMiGf9X1XjvgNemr8";
            data.decimals = 0 ;

            data.attributes= [
                {
                  "name": "Student Name",
                  "value": obj.sName
                },
                {
                  "name": "Position",
                  "value": obj.sPosition
                }
              ];

              data.creators =  [
                "tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm"
              ];
              data.isBooleanAmount = false;
              data.symbol = "CERT";
              data.rights =  "All right reserved.";
              data.shouldPreferSymbol = true;
        

        }
        else if(id === 2){
            // trophy

            data.name = obj.name;
            data.description = obj.description;
            data.artifactUri = "ipfs://QmQcRYop7CetsFyR6ZCurh7ee3gnFLx574JtANrn8VDy5p";
            data.displayUri = "ipfs://QmQcRYop7CetsFyR6ZCurh7ee3gnFLx574JtANrn8VDy5p";
            data.thumbnailUri = "ipfs://QmQcRYop7CetsFyR6ZCurh7ee3gnFLx574JtANrn8VDy5p";
            data.decimals = 0 ;

            data.attributes = [
              {
                "name": "Student Name",
                "value": obj.sName,
              },
              {
                "name": "Event Name",
                "value": obj.event,
              }
              ,
              {
                "name": "Sport",
                "value": obj.sport,
              }
              ,
              {
                "name": "Position",
                "value": obj.sPosition,
              }
            ];

            data.creators =  [
                "tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm"
              ];
            data.isBooleanAmount = false;
              data.symbol = "TROPH";
              data.rights =  "All right reserved.";
              data.shouldPreferSymbol = true;

        }else if (id === 3){
            // degree

            data.name = obj.name;
            data.description = obj.description;
            data.artifactUri = "ipfs://QmUDnTrbPT2Wf1h3ynFochYKUFrSHF3fi43NQtyokovrDM";
            data.displayUri = "ipfs://QmUDnTrbPT2Wf1h3ynFochYKUFrSHF3fi43NQtyokovrDM";
            data.thumbnailUri = "ipfs://QmUDnTrbPT2Wf1h3ynFochYKUFrSHF3fi43NQtyokovrDM";
            data.decimals = 0 ;


            data.attributes = [
              {
                "name": "Student Name",
                "value": obj.sName,
              },
              {
                "name": "Course",
                "value": obj.course,
              }
              ,
              {
                "name": "CGPA",
                "value": obj.cgpa,
              }
            ];
            
            data.creators =  [
                "tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm"
              ];
            data.isBooleanAmount = false;
              data.symbol = "DEG";
              data.rights =  "All right reserved.";
              data.shouldPreferSymbol = true;
        }

        const res = await jsonToPinata(data);
        const res2 = mintAchievement(res.Ipfs ,wallet);
        return{
            sucess : true,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
        };
        
    }

}
