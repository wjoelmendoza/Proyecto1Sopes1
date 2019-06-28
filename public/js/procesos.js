console.log("proceso cargado =)");
function recuperarInfo(){
    $.get('/proc_general',{}, mostrarInfo)
}

function mostrarInfo(data, status){
    if(!status)
        return;
    
    mostrarTablaResumen(data.estats);
    mostrarProcesos(data.procs);
}

function limpiar(html_div){
    while(html_div.hasChildNodes()){
        html_div.removeChild(html_div.firstChild);
    }
}

function mostrarTablaResumen(estadisticas){
    
    let tbResumen = document.getElementById("tabla_resumen");
    limpiar(tbResumen);
    let tb = document.createElement("table");
    let tbl = document.createElement("tbody");
    let enc = document.createElement("tr");
    let t1 = document.createElement("th");
    let txtt1 = document.createTextNode("Descripción");
    
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    t1 = document.createElement("th");
    txtt1 = document.createTextNode("Valor");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.appendChild(enc);

    enc = document.createElement("tr");
    t1 = document.createElement("td");
    txtt1 = document.createTextNode("Numero total de Procesos:");
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    t1 = document.createElement("td");
    txtt1 = document.createTextNode(estadisticas.numproc);
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.appendChild(enc)

    enc = document.createElement("tr");
    t1 = document.createElement("td");
    txtt1 = document.createTextNode("Procesos en Ejecución:");
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    t1 = document.createElement("td");
    txtt1 = document.createTextNode(estadisticas.proc_e);
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.appendChild(enc)

    enc = document.createElement("tr");
    t1 = document.createElement("td");
    txtt1 = document.createTextNode("Procesos Suspendidos:");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.appendChild(enc)

    t1 = document.createElement("td");
    txtt1 = document.createTextNode(estadisticas.proc_s);
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    enc = document.createElement("tr");
    t1 = document.createElement("td");
    txtt1 = document.createTextNode("Procesos Detenidos: ");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.appendChild(enc)

    t1 = document.createElement("td");
    txtt1 = document.createTextNode(estadisticas.proc_d);
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    enc = document.createElement("tr");
    t1 = document.createElement("td");
    txtt1 = document.createTextNode("Procesos Zombis: ");
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    t1 = document.createElement("td");
    txtt1 = document.createTextNode(estadisticas.proc_z);
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    tbl.appendChild(enc);
    tb.appendChild(tbl);
    tbResumen.appendChild(tb);
    tb.setAttribute("class", "table table-responsive table-striped")
}

function mostrarProcesos(procesos){
    let tbprocs = document.getElementById("tabla_procesos");
    limpiar(tbprocs);
    let tb = document.createElement("table");
    let tbl = document.createElement("tbody");
    let enc = document.createElement("tr");
    let t1 = document.createElement("th");
    let txtt1 = document.createTextNode("PID");
    t1.appendChild(txtt1);
    enc.appendChild(t1);

    t1 = document.createElement("th");
    txtt1 = document.createTextNode("Usuario");
    t1.appendChild(txtt1)
    enc.appendChild(t1);

    t1 = document.createElement("th");
    txtt1 = document.createTextNode("Estado");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.append(enc);

    t1 = document.createElement("th");
    txtt1 = document.createTextNode("%RAM");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.append(enc);

    t1 = document.createElement("th");
    txtt1 = document.createTextNode("Nombre");
    t1.appendChild(txtt1);
    enc.appendChild(t1);
    tbl.append(enc);

    for(let i = 0; i < procesos.length; i++){
        let proc = procesos[i];

        enc = document.createElement("tr");

        t1 = document.createElement("td");
        txtt1 = document.createTextNode(proc.pid);
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        t1 = document.createElement("td");
        txtt1 = document.createTextNode(proc.usuario);
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        t1 = document.createElement("td");
        txtt1 = document.createTextNode(proc.estado);
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        t1 = document.createElement("td");
        txtt1 = document.createTextNode(proc.pram);
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        t1 = document.createElement("td");
        txtt1 = document.createTextNode(proc.nombre);
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        t1 = document.createElement("td");
        txtt1 = document.createElement("button");
        txtt1.setAttribute("class", "btn btn-sm btn-circle btn-danger");
        txtt1.setAttribute("onclick", "matarProceso(" + proc.pid + ");");
        let ti = document.createElement('i');
        ti.setAttribute("class", "fas fa-stop")
        txtt1.appendChild(ti)
        t1.appendChild(txtt1);
        enc.appendChild(t1);

        tbl.append(enc);
    }

    tb.setAttribute("class", "table table-resposive table-striped");
    tb.append(tbl);
    tbprocs.append(tb);
}

function matarProceso(id){
    $.get("/kill/" + id,{},recuperarInfo)
}

$(document).ready(recuperarInfo)