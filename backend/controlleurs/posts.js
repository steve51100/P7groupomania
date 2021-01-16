const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const PostsManager = require ('../managers/PostsManager')

let postsManager = new PostsManager();

// POSTS //
exports.getAllPosts = (req, res, next) => {//Fonction de requête READ
    postsManager.getAllPosts()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
}
exports.createPost = (req, res, next) => { //Fonction de requête CREATE
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, title, content];
    postsManager.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
}
exports.updatePost = (req, res, next) => {//Fonction de requête UPDATE
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [title, content, postId, userId];
    postsManager.updatePost(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deletePost = (req, res, next) => {//Fonction de requête DELETE
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId, userId];
    postsManager.deletePost(sqlInserts1, sqlInserts2)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}


//COMMENTAIRES//
exports.getComments = (req, res, next) => {//Lecture des commentaires attachés à un post
    let postId = req.params.id;
    let sqlInserts = [postId];
    postsManager.getComments(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
}
exports.createComment = (req, res, next) => { //Création d'un commentaire
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, postId, content];
    postsManager.createComment(sqlInserts)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response));
        })
}

// LIKES

exports.getAllLikes = (req, res, next) =>{//Lecture du nombre de likes
     postsManager.getAllLikes()
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
}
exports.postLike = (req, res, next) => {//Creation et indentation de un like
    let userId = req.body.userId;
    let nbLikes = req.body.nbLikes;
    let postId = req.body.postId;
    let sqlInserts1 = [postId, userId];
    let sqlInserts2 = [nbLikes,postId];
    postsManager.postLike(sqlInserts1, sqlInserts2, req.body.liked)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response))
        }) 
}