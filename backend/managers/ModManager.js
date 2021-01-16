const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ModManager {
    constructor() {
        console.log('liaison au ModManager correcte')
    }

    getAllPosts(){//Sélection de données spécifiées dans la table posts avec jointure table users
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };
    deletePost(sqlInserts){//Suppression des données dans la table posts condition id=id
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post supprimé !'});
            })
        })
    };
    getAllComments(){//Sélection de données spécifiées dans la table comments avec jointure de la table users
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    };
    deleteComment(sqlInserts){//Suppression du commentaire sélectionné
        let sql = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Commentaire supprimé !'});
            })
        })
    };

    getAllGifs(){//Récupération dans la table gifs des éléments gifId, title, url et date
        let sql = "SELECT gifs.id, gifs.title, gifs.name, gifs.url, DATE_FORMAT(DATE(gifs.date), '%d/%m/%Y') AS date, TIME(gifs.date) AS time FROM gifs ORDER BY gifs.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    deleteGif(sqlInserts){//Suppression du gif sélectionné
        let sql = 'DELETE FROM gifs WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Gif supprimé !'});
            })
        })
    };


}


module.exports = ModManager;