const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controlleurs/posts');//Route des fonctions de gestion des posts

try{
    /*LES POSTS*/
    router.get('/', auth, postsCtrl.getAllPosts);//Lecture de tous les posts
    router.post('/', auth, postsCtrl.createPost);//Création d'un post
    router.put('/:id', auth, postsCtrl.updatePost);//Modification d'un post
    router.delete('/:id', auth, postsCtrl.deletePost); //Suppression d'un post

    /*LES LIKES*/
    router.get('/likes', auth, postsCtrl.getAllLikes);//Lecture de la totalité des likes d'un post
    router.post('/:id/like', auth, postsCtrl.postLike);//Création et indentation d'un like
 
    /*LES COMMENTAIRES*/
    router.get('/:id/comments', auth, postsCtrl.getComments);//Lecture d'un commentaire attaché à un postId
    router.post('/:id/comments', auth, postsCtrl.createComment);//Création d'un commentaire attaché à un postId
    

}catch (error){
    console.log(error);
} 

module.exports = router;