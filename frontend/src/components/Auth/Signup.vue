<template>
    <v-app class="signup ma-auto mt-6" v-if="form">
        <v-card class="signup__card" shaped>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field  v-model="dataSignup.firstName" :rules="nameRules" label="Prénom" prepend-icon="mdi-account-circle" autofocus required></v-text-field>
                    <v-text-field  v-model="dataSignup.lastName" :rules="nameRules" label="Nom" prepend-icon="mdi-account-circle" required></v-text-field>
                    <v-text-field  v-model="dataSignup.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required></v-text-field>
                    <v-text-field  v-model="dataSignup.password" :rules="passRules" type="password" label="mot de passe" prepend-icon="mdi-lock"  required></v-text-field>
                </v-form>
                <v-btn :disabled="!valid" class="success" @click="sendSignup()">Envoyer</v-btn>
                <p v-if="msg">{{ message }}</p>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"
export default {
    name : "Signup",
    data(){
        return{
            valid: true,
            nameRules: [
                v => !!v || 'Le nom est requis !',
            ],
            emailRules: [
                v => !!v || 'E-mail est requis',
                v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
            ],
            passRules: [
                v => !!v || 'le mot de passe dois contenir 08 caractères minimum (dont 1 majuscule, 1 minuscule, 1 chiffre, pas de symbole, espaces non autorisés) !'
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        sendSignup(){
            this.dataSignupS = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignupS, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
            })
            .catch(error => {
                console.log(error);
                this.message = 'Il y a une erreur d\'enregistrement';
                this.msg = true; 
                });
        }
    }
}
</script>

<style lang="scss">
    .signup{
        position: relative;
        top : 5%;
        width: 350px;
        max-height: 200px;
        text-align: center;
    }
</style>