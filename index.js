const express = require('express');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');
const postController = require('./postController');
const fs = require('fs');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({extended: false});


let cadena_conexion;

/**
 * Esta función se encarga de leer la cadena de conexion de la
 * base de datos
 */
function init(){
    let dir = 'properties.conf';
    let arc;
    if(fs.existsSync(dir)){
        arc = fs.readFileSync(dir, 'utf-8');
    }else{
        arc = fs.readFileSync('/test/app/properties.conf', 'utf-8');
    }
    let ln = arc.split('\n');
    cadena_conexion = ln[0];
}

init();
mongoose.connect(cadena_conexion);
const db = mongoose.connection;

const app = express();

/**
 * configurando express para que pueda leer el json de 
 * las peticiones
 */
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());


/***
 * Ruta de acceso principal
 */
app.get('/', urlencodedParser, (req, res)=>{
    if(req.url != '/'){
        postController.new(req, res, req.query);
    }else{
        res.send('Hola mundo con Express')
    }
});

app.get('/test/', urlencodedParser, (req, res)=>{
    
        postController.index(req, res);
    
});


app.get('/carga', urlencodedParser, function(req, res){
    console.log(req.query);
    res.send("<h1>Hola Mundo! &#35;<h1>");
});

app.use('/api', apiRoutes);

app.listen(8080, function(){
    console.log("escuchando en el puerto: 8080");
});
