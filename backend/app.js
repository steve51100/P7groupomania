const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//routes CRUD
const routesUsers = require('./routes/routesUsers');
const routesPosts = require('./routes/routesPosts');
const routesMod = require('./routes/routesMod');
const routesGifs = require('./routes/routesGifs');


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Endpoints utilisés par l'API du serveur localhost: 3000

app.use('/api/auth', routesUsers);
app.use('/api/posts', routesPosts);
app.use('/api/moderation', routesMod);
app.use('/api/gifs', routesGifs);


module.exports = app;