<template>
    <v-app id="formPost">
        <top-header/>
        <h1 class="ml-12">Le mur</h1>
        <v-card class="ma-3 ml-12">
            <v-card-title class="mb-3">
                <h2>Nouveau post </h2>
                <p>{{ message }}</p>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <v-text-field v-model="dataPost.title" :rules="title1Rules" :counter="50" label="Title" autofocus required></v-text-field>
                    <v-textarea v-model="dataPost.content" :rules="contentRules" label="Content" required></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn  :disabled="!valid" class="success" @click="sendPost">Poster</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"
import TopHeader from "./TopHeader"
export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            title1Rules: [
                v => !!v || 'Le titre est requis',
                v => (v && v.length <= 50) || 'Le titre ne doit pas dépasser 50 caracteres',
            ],
            contentRules: [
                v => !!v || 'Mettez nous un texte ou un lien !',
            ],
            dataPost:{
                title: "",
                content:"",
                userId : localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Accueil')  
                })
                .catch(error => {
                    console.log(error); 
                    this.message = 'Il y a un problème dans l\'envoi du formulaire !';
                    this.msg = true
                });
        },
    },
    components: {
        "top-header": TopHeader, 
    },
    
}
</script>
<style lang="scss">
</style>