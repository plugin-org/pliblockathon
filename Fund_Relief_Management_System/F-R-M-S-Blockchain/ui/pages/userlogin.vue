<template>
    <v-container class="form">
        <v-form>
             <v-col>
                <v-row >
                    <v-text class="lol">User Login</v-text>
                </v-row>
                 <v-row>
                     <v-text-field placeholder="UserName" v-model="username"></v-text-field>
                 </v-row>
                 <v-row>
                     <v-text-field placeholder="Password" v-model="password"></v-text-field>
                 </v-row>
                 <v-row>
                     <v-btn block @click="signin()">Login</v-btn>
                 </v-row>
             </v-col>
        </v-form>
    </v-container>
</template>
<script>
    export default {
        name: "userLogin",
        data: () => ({
            username: "",
            password: ""
        }),
        methods: {
            async signin() {
                let login = {
                    username: this.username,
                    password: this.password
                }
                let res = await this.$axios.post("http://127.0.0.1:8000/userlogin",login)
                if (res.data == true){
                    this.$router.push('/user')
                }
            }
        }
    }
</script>
<style>
    .form{
        width:500px;
        margin:10% auto;
        border:1px solid grey;
        box-shadow: 3px 3px grey;
        font-size:20px;

    }
</style>