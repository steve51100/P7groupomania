const mysql = require('mysql');
/*Utilisation du module mysql de node*/
const dotenv = require('dotenv').config();
console.log('connectdb');
//Création de la connection
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: 'steve', 
    password: 'Maison@51', 
    database: 'p7groupomania', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à la base de données votre base !')
});

module.exports = connectdb;