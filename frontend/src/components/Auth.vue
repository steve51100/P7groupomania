<template>
  <v-app id="auth">
    <div class="logo">
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo groupomania"  
      />
       <v-container class="auth">
            <div class="auth__boutons">
                <v-btn class="auth__boutons--ind" @click="component='login'">Se connecter</v-btn>
                <v-btn class="auth__boutons--ind" @click="component='signup'">S'inscrire</v-btn>
            </div>
            <component v-bind:is="component"></component>
        </v-container>
    </div>

  </v-app>
</template>


<script>
  import Login from "./Auth/Login"
    import Signup from "./Auth/Signup"
    export default {
        name : "Auth",
        data(){
            return{   
                component: ""
            }
        },
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss" scoped>
#auth {
  width: 600px;
  height: 600px;
  border: 3px solid rgb(255,215,215);
  border-radius: 20px;
  box-shadow: 0px 0px 60px rgb(114, 72, 72);
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-size: 100%;
  
  margin: auto;
}
img {
 width: 500px;
 margin-left: 50px;
 position: absolute;
 top: -150px;
  
 
}

.auth{
   margin-top: 150px;
}
.auth {
        &__boutons{
            margin-left: 150px;
            
            &--ind :hover{
                animation: shake 0.80s cubic-bezier(.36,.07,.19,.97) both; 
                transform: translate3d(0, 0, 0); 
                backface-visibility: hidden; 
                perspective: 1000px;  
                
            }
        }
    }

     @media all and (max-width:500px){
       #auth{
         width: 100%;
         height: 80%;
       }
       img{
         width: 80%;
         margin-top: 50px;
       }
     }
     .signup__card{
       width: 60%;
       margin-left: 0px;
     }
     .container_auth{
       width: 80%;
     }
     .login
      {
       width: 80% !important;
     }
     .signup{
       width: 95%  !important;
     }
     
     
     
</style>