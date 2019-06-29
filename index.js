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
        arc = fs.readFileSync('./test/app/properties.conf', 'utf-8');
    }
    let ln = arc.split('\n');
    cadena_conexion = ln[0];
}

init();
mongoose.connect(cadena_conexion);
//const db = mongoose.connection;

const app = express();

/**
 * configurando express para que pueda leer el json de 
 * las peticiones
 */
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());
app.use(express.static('public'));

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

/**
 * Ruta para la busqueda de palabras
 */
app.get('/api/buscar/', urlencodedParser, (req, res)=>{
    if(req.url != '/'){
        postController.busqueda(req, res, req.query);
    }else{
        res.send('Hola tuvo que ser una búsqueda')
    }
});

app.get('/test/', urlencodedParser, (req, res)=>{
    
        postController.index(req, res);
    
});
/***
 * Punto de acceso a la mayoria de recursos rest
 */
app.use('/api', apiRoutes);

app.get('/dashboard_admin', (req, res)=>{
    res.render('dashboard_admin.ejs');
})

//página de búsquedas
app.get('/busquedas', (req, res)=>{
    res.render('dashboard_busqueda.ejs');
})


app.listen(8080, function(){
    console.log("escuchando en el puerto: 8080");
});
