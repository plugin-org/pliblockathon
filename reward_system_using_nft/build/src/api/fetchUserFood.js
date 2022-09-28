import axios from 'axios'

export const getFoodBal = async (address) =>  {

    try {

        const response = await Promise.all([
            axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/156137/keys/{ "nat": "0", "address": "${address}" }`),
            axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/156137/keys/{ "nat": "1", "address": "${address}" }`),
            axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/156137/keys/{ "nat": "2", "address": "${address}" }`),
            axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/156137/keys/{ "nat": "3", "address": "${address}" }`)
        ]);

        let value = {};

        for(var i = 0 ; i< response.length ; i++){
            if(response[i].status === 200){
                value[i] = response[i].data.value;
            }
            else{
                value[i] = 0
            }
        }

        return{
            sucess : true,
            value : value
        };

        
    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            value : {}
        };
        
    }

}

export const getAchievements = async (address) =>  {

    try {

        // https://api.ghostnet.tzkt.io/v1/tokens/balances?token.contract=KT1KU4krNtEbiapDXvjMzL4YJ1WXiMF8MHFy&account=tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm


        const response = await axios.get(`https://api.ghostnet.tzkt.io/v1/tokens/balances?token.contract=KT1KU4krNtEbiapDXvjMzL4YJ1WXiMF8MHFy&account=${address}`);
        const data = response.data;


        let value = [];

        for(var i = 0 ; i< data.length ; i++){
            if (data[i].balance!=0){
            let obj = data[i].token.metadata;
            value.push({name : obj.name , symbol : obj.symbol , attributes : obj.attributes});
               }
        }

        return{
            sucess : true,
            value : value
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            value : {}
        };
        
    }

}

