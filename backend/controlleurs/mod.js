const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const ModManager = require ('../managers/ModManager.js');

let modManager = new ModManager();

/**POSTS */
exports.getAllPosts = (req, res, next) => {//Lecture des posts
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    if(mod === 1){
        modManager.getAllPosts()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) =>{
                res.status(400).json(error)
            });
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.deletePost = (req, res, next) => {//Suppression d'un post
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    //console.log(mod);
    if(mod === 1){
        let postId = req.params.id;
        let sqlInserts = [postId];
        modManager.deletePost(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) =>{
                res.status(400).json(error)
            });
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
/**COMMENTAIRES */
exports.getAllComments = (req, res, next) => {//Lecture de tous les commentaires d'un post
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    if(mod === 1){
        modManager.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.deleteComment = (req, res, next) => {//Suppression d'un commentaire
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    if(mod === 1){
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        modManager.deleteComment(sqlInserts)
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
/**GIFS */
exports.getAllGifs = (req, res, next) => {//Lecture de tous les gifs
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    if(mod === 1){
        modManager.getAllGifs()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) =>{
                res.status(400).json(error)
            });
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.deleteGif = (req, res, next) => {//Suppression d'un gif
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const mod = decodedToken.moderation;
    //console.log(mod);
    if(mod === 1){
        let gifId = req.params.id;
        let sqlInserts = [gifId];
        modManager.deleteGif(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) =>{
                res.status(400).json(error)
            });
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}