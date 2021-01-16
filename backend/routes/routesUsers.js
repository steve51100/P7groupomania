const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controlleurs/user');
const bouncer = require('express-bouncer')(5000, 30000, 3);//Permet 3 essais ensuite interruption entre 5 secondes et 30 secondes
//empêche les attaques par force-brute 
bouncer.whitelist.push ("127.0.0.1");
/**ROUTES UTILISATEUR */
try{
    router.post('/signup', userCtrl.signup);//Création d'un nouveau utilisateur
    router.post('/login', bouncer.block, userCtrl.login);//Création d'une Identification de l'utilisateur
    router.get('/', auth, userCtrl.seeMyProfile);//Lecture des informations utilisateur
    router.delete('/', auth, userCtrl.deleteUser);//Suppression du compte utilisateur
    router.put('/', auth, userCtrl.updateUser);//Modification du compte utilisateur
}catch (error){
    console.log(error);
}

module.exports = router;