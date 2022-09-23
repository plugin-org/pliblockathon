<template>
    <v-app>
        <v-container class="form">
            <v-form>
                <v-col>
                    <v-row>
                        <v-btn text @click="user()" >User Login</v-btn>
                    </v-row>
                    <v-row>
                        <v-btn text @click="admin()"> Admin Login</v-btn>
                    </v-row>
                </v-col>
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