const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controlleurs/user');
const verifyPassword = require('../middleware/pass');

//empêche les attaques par force-brute 
const rateLimite = require('express-rate-limit');

//Limite la connection abusive
const limiter = rateLimite({
    windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "trop de requete abusive , vous devez attendre 3 minutes",
  
});

console.log(limiter);

/**ROUTES UTILISATEUR */
try{
    router.post('/signup',verifyPassword, userCtrl.signup);//Création d'un nouveau utilisateur
    router.post('/login', limiter , userCtrl.login);//Création d'une Identification de l'utilisateur
    router.get('/', auth, userCtrl.seeMyProfile);//Lecture des informations utilisateur
    router.delete('/', auth, userCtrl.deleteUser);//Suppression du compte utilisateur
    router.put('/', auth, userCtrl.updateUser);//Modification du compte utilisateur
}catch (error){
    console.log(error);
}

module.exports = router;