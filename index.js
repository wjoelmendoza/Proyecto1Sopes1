const express = require('express');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({extended: false});

let cadena_conexion;

function init(){
    let arc = fs.readFileSync('properties.conf', 'utf-8');
    let ln = arc.split('\n');
    cadena_conexion = ln[0];
}

init();
mongoose.connect(cadena_conexion);
const db = mongoose.connection;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());



app.get('/', (req, res)=>{
    res.send('Hola mundo con Express')
});

app.get('/carga', urlencodedParser, function(req, res){
    console.log(req.query);
    res.send("<h1>Hola Mundo! &#35;<h1>");
});

app.use('/api', apiRoutes);

app.listen(8080, function(){
    console.log("escuchando en el puerto: 8080");
});
