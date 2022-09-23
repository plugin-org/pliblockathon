<template>
    <v-container class="form">
        <v-form>
        <v-col>
            <v-row>
                <v-text-field placeholder="description" v-model="description"></v-text-field>
            </v-row>
            <v-row>
                <v-text-field placeholder="value" v-model="value"></v-text-field>
            </v-row>
            <v-row>
                <v-btn block @click="post()">Post</v-btn>
            </v-row>
        </v-col>
    </v-form>
    </v-container>
</template>
<script>
    import web3 from "xdc3";
    export default{
        name:"admin",
        data:()=>({
            description:"",
            value:""
        }),
        methods:{
            async post(){
                let post={
                    description:this.description,
                    value:this.value
                }
                if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Xinfin browser detected. You should consider trying XDCpay"
      );
    }
    const web3 = window.web3;
    let accounts = await web3.eth.getAccounts();
    console.log(web3)
            }
        }
    }
</script>
<style>
    .form{
        width:500px;
        margin: 10% auto;
    }
</style>