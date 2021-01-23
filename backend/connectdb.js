const mysql = require('mysql');
/*Utilisation du module mysql de node*/
const path = require('path');
const dotenv = require('dotenv').config({ path: process.cwd() + '/.env' });
console.log('connectdb');
//Création de la connection
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE, 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à la base de données votre base !')
});

module.exports = connectdb;