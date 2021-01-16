const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const UserManager = require ('../managers/UserManager.js');


let userManager = new UserManager();

exports.signup = (req, res, next) => {//Fonction de requête CREATE utilisateur
    let email = req.body.email;
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            userManager.signup(sqlInserts)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error)) 
};


exports.login = (req, res, next) => {//CREATE de email et password de l'utilisateur pour authentification
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    userManager.login(sqlInserts, password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}

exports.seeMyProfile = (req, res, next) => {//fonction de READ des données
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userManager.seeMyProfile(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}

exports.updateUser = (req, res, next) => {//Fonction UPDATE du compte utilisateur
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, userId];
    userManager.updateUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
 
exports.deleteUser = (req, res, next) => {//Fonction DELETE du compte utilisateur  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.jwt');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userManager.deleteUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
} 