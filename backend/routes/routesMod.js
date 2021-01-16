const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');//Route de la fonction auth
const modCtrl = require('../controlleurs/mod');//Route des fonctions de gestion du modérateur

/**ROUTES DES FONCTIONNALITES LIEES A LA MODERATION */
try{
    router.get('/comments', auth, modCtrl.getAllComments);//Lecture de tous les commentaires
    router.get('/posts', auth, modCtrl.getAllPosts);//Lecture de tous les posts
    router.get('/gifs', auth, modCtrl.getAllGifs);//Lecture de tous les gifs
    router.delete('/comment/:id', auth, modCtrl.deleteComment);//Suppression de commentaire
    router.delete('/post/:id', auth, modCtrl.deletePost);//Suppression de post sélectionné
    router.delete('/gif/:id', auth, modCtrl.deleteGif);//Suppression de gif séléctionné
}catch (error){
    console.log(error);
}

module.exports = router;