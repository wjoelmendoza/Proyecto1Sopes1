let catTopNombre = document.getElementById('ctopn');
let catTopCantidad = document.getElementById('ctopc');
let tusuarios = document.getElementById('tusuarios');
let tcategorias = document.getElementById('tcats');

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

setInterval(recDataCategorias, 4000);
setInterval(recDataCatT, 4000);
setInterval(recDataUsuarios, 4000);