<template>
    <v-app id="formgifs"><!--Formulaire de création d'un gif   -->
        <top-header/>
        <h1 >Accueil avec une bataille de gifs :</h1>
        <v-card class="ma-3 ml-12">
            <v-card-title class="mb-3">
                <h2>Nouveau gif </h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <v-text-field v-model="dataGif.title" :rules="titleRules" :counter="50" label="Title" autofocus required></v-text-field>
                    <!--L'utilisateur écrit son nom ou un pseudo ou un surnom plus ludique-->
                    <v-text-field v-model="dataGif.name" :rules="nameRules" :counte="50" label="Name / Pseudo"  required></v-text-field>
                    <v-text-field v-model="dataGif.url" :rules="urlRules" label="Adresse URL de type HTTP:" required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn  :disabled="!valid" class="success" @click="sendGif">GO !</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios";
import TopHeader from "./TopHeader";
    export default {
        name: "FormPost",
    data(){
        return{
            valid: true,
            
            titleRules: [
                v => !!v || 'Le champs est requis',
                v => (v && v.length <= 50) || 'Le titre comprend moins de 50 characters',
            ],
            nameRules: [
                v => !!v || 'Le champs est requis',
            ],
            urlRules: [
                v => !!v || 'Le champs est requis',
                 v => /^(http|https):/.test(v) || 'URL de format http doit être utilisé !',
            ],
            dataGif:{
                title: "",
                name:"",
                url:"",
                userId: localStorage.userId
            },
            dataGifS: "",
            msg: false,
            message: "",
        }
    },
    components: {
        "top-header": TopHeader, 
        
    },
    methods: {
        sendGif(){
            this.dataGifS = JSON.stringify(this.dataGif);
            axios.post("http://localhost:3000/api/gifs/", this.dataGifS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Accueil')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
    computed: {},
    }
</script>

   
<style lang="scss">
h1{
    margin-left:50px;
}
</style>