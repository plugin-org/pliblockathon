<template>
    <v-container class="form">
        <v-form>
            <v-col>
                <v-row>
                    <v-text-field placeholder="value" v-model="value"></v-text-field>
                </v-row>
                <v-row>
                    <v-btn block @click="donate()">Donate</v-btn>
                </v-row>
            </v-col>
        </v-form><br/><br/>
        <v-form>
            <v-col>
                <v-row>
                    <v-btn block @click="fetch()">Fetch</v-btn>
                </v-row>
                <v-row>
                    <v-btn block @click="vote()">Vote</v-btn>
                </v-row>
            </v-col>
        </v-form>
        
    </v-container>
</template>
<script>
    export default{
        name: "user",
        data: () => ({
            value: ""
        }),
        methods: {
            async donate(){
                let donate = {
                    value: this.value
                }
                const res = this.$axios.post("http://127.0.0.1:8000/user", donate);
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