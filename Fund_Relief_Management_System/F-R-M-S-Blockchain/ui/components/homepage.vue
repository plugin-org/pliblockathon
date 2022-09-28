<template>
    <v-app>
        <v-container class="form">
            <v-form>
            <v-row>
                <v-col></v-col>
                <v-col>
                    <v-row class="space">
                    
                        <v-text class="text">
                            Fund Relif Managment System
                        </v-text>
                    </v-row>

                    <v-row>
                    <v-col></v-col>
                        <v-btn text @click="user()" class= "box">User Login</v-btn>
                    <v-col></v-col>
                    </v-row>

                    
                    <v-row>
                     <v-col></v-col>
                        <v-btn text @click="admin()"class= "box"> Admin Login</v-btn>
                     <v-col></v-col>
                    </v-row>
                              
                </v-col>
                <v-col></v-col>
            </v-row>
            </v-form>
        </v-container>

     
    </v-app>
</template>
<script>
    import Web3 from 'xdc3'
    export default{
        name: "homepage",
        data:()=> ({

        }),
        methods:{
            async sendmoney(){
                if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Xinfin browser detected. You should consider trying XDCpay"
      );
    }
            },
            async admin(){
                this.$router.push('/adminlogin')
            },
            async user(){
                this.$router.push('/userlogin')
            }
            
        }
    }
</script>


<style>
.space{
margin-top:10em;

}

.box{
border:1px solid white;
width: 50%;
margin-top:2em;
margin-right:30px;


}

.text{
font-size:25px;
text-shadow: 1px 2px white;

}
</style>