const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();



class UserManager {
    constructor() {
        console.log('liaison UserManager correcte')
    }
    signup(sqlInserts){//Fonction d'insertion des données dans la table Users
        let sql = 'INSERT INTO users  VALUES(NULL, ?, ?, ?, ?, NULL)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({error : 'Erreur dans l\'inscription'});
                resolve({message : 'Nouvel utilisateur !'})
            })
        })
        

    }
    login(sqlInserts, password){
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql = mysql.format(sql, sqlInserts);
        //Lecture des données de l'utilisateur et attribution d'un token
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({ err: 'Utilisateur inexiste ?' });
                
                if (!result[0]){
                    reject ({ error : 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password) 
                        .then(valid => { 
                            if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                            resolve({
                                userId: result[0].id,
                                token: jwt.sign(
                                    { userId: result[0].id,
                                    moderation: result[0].moderation },
                                    'process.env.jwt',
                                    { expiresIn: '2h' } 
                                ),
                                moderation: result[0].moderation
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        
        })
    }
    seeMyProfile(sqlInserts){//Lecture des données de l'utilisateur
        let sql = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : 'page indisponible'});
                resolve(result);
            }) 

        })
    
    }
    updateUser(sqlInserts){//Modification des données de l'utilisateur
        let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : 'fonction indisponible'});
                resolve({message : 'Informations mises à jour !'});
            }) 

        })
    }
    deleteUser(sqlInserts){//Suppression des données de l'utilisateur
        let sql = 'DELETE FROM users WHERE id = ?'; 
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : 'fonction indisponible'});
                resolve({message : 'Utilisateur supprimé'});
            }) 

        })
    
    }
}

module.exports = UserManager;