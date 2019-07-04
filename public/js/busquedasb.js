let areatweets = document.getElementById('areaTweets');
let buscarPalabra = document.getElementById('buscarPalabra');
console.log("cargando busqueda...")

function buscar(){
    let dir = '/api/buscar/?palabra='+buscarPalabra.value
    $.get(dir,{}, actTweets)
}

function actTweets(data, status){
    if(!status)
    {
        return;
    }

    if(data.estado=="error"){
        console.log(data.mensaje);
        return;
    }

    areatweets.removeChild(areatweets.firstElementChild);
    let resultados = data.datos;
    let padre = document.createElement('div');
    areatweets.appendChild(padre);
    for(let i = 0; i < resultados.length; i++){
        crearDivTweet(padre, resultados[i]);
    }
}

function crearDivTweet(padre, tweet){
    let sup = document.createElement('div');
    sup.className = "card border-left-primary shadow h-100 py-2";
    sup.style="margin-bottom: 2%;"
    padre.appendChild(sup);
    let cuerpo = document.createElement('div');
    sup.appendChild(cuerpo);
    cuerpo.className = "card-body";
    let rowcont = document.createElement('div');
    cuerpo.appendChild(rowcont);
    rowcont.className = "row no-gutters align-items-center"
    let colcont = document.createElement('div');
    rowcont.appendChild(colcont);
    colcont.className = "col mr-2";
    let titulo = document.createElement('div');
    colcont.appendChild(titulo);
    
    let nombre = document.createElement('span');
    titulo.appendChild(nombre);
    nombre.className = "font-weight-bold text-primary mb-1";
    let txt = document.createTextNode(tweet.nombre);
    nombre.appendChild(txt);

    let usr = document.createElement('span');
    titulo.appendChild(usr)
    usr.className = "text-xs font-weight-bold text-primary mb-1"
    txt = document.createTextNode("@"+tweet.usuario);
    usr.appendChild(txt);

    let fecha = document.createElement('span');
    titulo.appendChild(fecha)
    fecha.className = "text-xs text-gray";
    fecha.style = "margin-left: 3%";
    txt = document.createTextNode(tweet.fecha_publicacion);

    let post = document.createElement('div');
    colcont.appendChild(post);
    txt = document.createTextNode(tweet.txt);
    post.appendChild(txt);

    let d = document.createElement('div');
    rowcont.appendChild(d);
    d.className = "col-auto"

    let i = document.createElement('i');
    d.appendChild(i);
    i.className = "fas fa-comments fa-2x text-gray-300";
}

/*$(buscarPalabra).on('keyup',function(event){
    console.log(event);
    if(event.wich === 13 || event.wich == 10){
        console.log("enter");
    }
});*/

$("#buscarPalabra").keyup(function(event){
    if(event.which === 13 || event.which === 10){
        buscar();
    }
});