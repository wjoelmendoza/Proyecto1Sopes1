let catTopNombre = document.getElementById('ctopn');
let catTopCantidad = document.getElementById('ctopc');
let tusuarios = document.getElementById('tusuarios');
let tcategorias = document.getElementById('tcats');
let usrTopNombre = document.getElementById('utopn');
let usrTopCantidad = document.getElementById('utopc');
let tTweets = document.getElementById('tweets');

function recDataCatT(){
    $.get('/api/categoria_top',{}, actCatT);
}

function actCatT(data, status){
    if(!status){
        return;
    }

    if(data.estado == "error"){
        console.log(data.mensaje);
        return;
    }

    catTopNombre.removeChild(catTopNombre.firstChild);
    catTopCantidad.removeChild(catTopCantidad.firstChild);
    let cat = data.datos;

    let txtNom = document.createTextNode(cat.categoria);
    let txtCant = document.createTextNode(cat.cantidad);

    catTopNombre.appendChild(txtNom);
    catTopCantidad.appendChild(txtCant);
}



function recDataUsuarios(){
    $.get('/api/usuarios', {}, actUsuarios);
}

function actUsuarios(data, status){
    if(!status){
        return;
    }

    if(data.estado == "error"){
        console.log(data.mensaje);
        return;
    }

    tusuarios.removeChild(tusuarios.firstChild);
    let txt = document.createTextNode(data.datos.cantidad);
    tusuarios.appendChild(txt);
}

function recDataCategorias(){
    $.get('/api/categorias', {}, actCategorias);
}

function actCategorias(data, status){
    if(!status){
        return;
    }

    if(data.estado == "error"){
        console.log(data.mensaje);
        return;
    }

    tcategorias.removeChild(tcategorias.firstChild);
    let txt = document.createTextNode(data.datos.cantidad);
    tcategorias.appendChild(txt);
}

function recDataUsuarioTweets(){
    $.get('/api/usuario_tweets', {}, actUsuarioTweets);
}

function actUsuarioTweets(data, status){
    if(!status){
        return;
    }

    if(data.estado == "error"){
        console.log(data.mensaje);
        return;
    }

    let dt = data.datos;

    usrTopCantidad.removeChild(usrTopCantidad.firstChild);
    usrTopNombre.removeChild(usrTopNombre.firstChild);
    let txt = document.createTextNode(dt.publicaciones);
    usrTopCantidad.appendChild(txt);

    txt = document.createTextNode(dt.usuario);
    usrTopNombre.appendChild(txt);
}

function recDataTweets(){
    $.get('/api/tweets', {}, actTweets);
}

function actTweets(data, status){
    if(!status){
        return;
    }

    if(data.estado == "error"){
        console.log(data.mensaje);
        return;
    }

    tTweets.removeChild(tTweets.firstChild);
    let txt = document.createTextNode(data.datos.cantidad);
    tTweets.appendChild(txt);
    
}

setInterval(recDataTweets, 4000);
setInterval(recDataUsuarioTweets, 4000);
setInterval(recDataCategorias, 4000);
setInterval(recDataCatT, 4000);
setInterval(recDataUsuarios, 4000);