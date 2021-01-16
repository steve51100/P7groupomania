const connectdb = require('../connectdb.js');
const mysql = require('mysql');

class GifsManager {
    constructor() {
        console.log('liaison au GifsManager correcte')
    }
    

    //GIFS

    getAllGifs(){//Récupération dans la table gifs des éléments userId, title, name, url et date
        let sql = "SELECT gifs.userId, gifs.title, gifs.name, gifs.url, DATE_FORMAT(DATE(gifs.date), '%d/%m/%Y') AS date, TIME(gifs.date) AS time FROM gifs ORDER BY gifs.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };
    
    createGif(sqlInserts){//Création des données du formulaire Gif
        let sql = 'INSERT INTO gifs (userId, title, name, url, date) VALUES( ?, ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({message : 'Nouveau gif !'});
            })       
        })
    }

    
   
}

module.exports = GifsManager;