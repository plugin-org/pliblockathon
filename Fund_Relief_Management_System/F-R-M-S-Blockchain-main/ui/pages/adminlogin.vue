<template>
    <v-container class="form">
        <v-form>
            <v-col>
                <v-row>
                    <v-text-field placeholder="username" v-model="username"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field placeholder="password" v-model="password"></v-text-field>
                </v-row>
                <v-row>
                    <v-btn block @click="signin()"> Sign In</v-btn>
                </v-row>
            </v-col>
        </v-form>
    </v-container>
</template>
<script>
    export default{
        name:"adminlogin",
        data:() =>({
            username:"",
            password :"",
        }),
        methods:{
            async signin(){
                let login = {
                    username: this.username,
                    password :this.password
                }
                let res = await this.$axios.post("http://127.0.0.1:8000/adminlogin",login)
                if(res.data==true){
                    this.$router.push('/admin')
                }
            }
        }
    }
</script>
<style>
    .form{
        width:500px;
        margin:10% auto;
    }
</style>