const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const GifsManager = require ('../managers/GifsManager.js')

let gifsManager = new GifsManager();

// GIFS
exports.getAllGifs = (req, res, next) => {//Lecture de tous les gifs
    gifsManager.getAllGifs()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
};

exports.createGif = (req, res, next) => { //Création d'un gif
    let title = req.body.title;
    let name = req.body.name;
    let userId = req.body.userId;
    let url = req.body.url;
    let sqlInserts = [userId, title, name, url];
    gifsManager.createGif(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
};