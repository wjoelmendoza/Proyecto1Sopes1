let bodyTable = document.getElementById('bodyTable');
let search = document.getElementById('search');

function getDataTable(){
    $.get('/test/',{}, getquerytable);
}
//query que devuelve todos los registros de la bd
function getquerytable(datos, status){
    if(!status){
        return;
    }
    datos = datos.datos;
    for(var i = 0; i < datos.length; i++){
        tr = document.createElement('tr');
        //nombre
        td = document.createElement('td');
        td.innerHTML = datos[i].nombre;
        tr.appendChild(td);
        //usuario
        td = document.createElement('td');
        td.innerHTML = datos[i].usuario;
        tr.appendChild(td);
        //tweet
        td = document.createElement('td');
        td.innerHTML = datos[i].txt;
        tr.appendChild(td);
        //categoria
        td = document.createElement('td');
        td.innerHTML = datos[i].categoria;
        tr.appendChild(td);
        //fecha publicacion
        td = document.createElement('td');
        td.innerHTML = datos[i].fecha_publicacion;
        tr.appendChild(td);

        bodyTable.appendChild(tr);
    }
}

function getDataSearch(texto){
        limpiar(bodyTable);
        $.get('/api/buscar/?palabra='+texto, {}, getquerytable);
}


function limpiar(html_div){
    while(html_div.hasChildNodes()){
        html_div.removeChild(html_div.firstChild);
    }
}

getDataTable();
$(search).on('keyup', function(){
    getDataSearch(search.value);
});