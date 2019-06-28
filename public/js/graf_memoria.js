Chart.defaults.global.defaultFontFamily = 'Numito', '-apple-system,system-ui,BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'
let grafMem = document.getElementById('graficarMemoria');
let lblMem = -20;
let chartMem = new Chart(grafMem, {
    type: 'line',
    data: {
        labels: [lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1,
        lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1, lblMem += 1],
        datasets: [{
            label: "Memoria Usada: ",
            lineTension: 0,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            fill : true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }]
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'second'
                },
                gridLines: {
                    display:true,
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 20
                }
            }],
            yAxes:[{
                ticks:{
                    maxTicksLimit: 10,
                    callback: function(value, index, values){
                        return value + " MB"
                    }
                }
            }],
        },
        legend : {
            display: false
        },
        tooltips:{
            callbacks:{
                label: (tooltipItem, chart) =>{
                    let datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel+ ': ' + tooltipItem.yLabel + ' MB';
                }
            }
        }
    }
},

);


function recDataMem(){
    $.get('/meminfo',{}, refrescarGraficoMem)
}

function refrescarGraficoMem(data, status){
    if(!status)
        return
    
    let t = document.getElementById('datos_mem');
    t.removeChild(t.firstChild);
    let texto = document.createTextNode("Memoria total: " + data.mem_total + "MB;\n Porcentaje Consumido: " + data.pcons + "%")
    t.appendChild(texto);
    
    let lbls = chartMem.data.labels;
    lbls.push(lbl+=1);
    lbls = lbls.slice(1);
    chartMem.data.labels = lbls;

    let datos = chartMem.data.datasets[0].data;
    datos = datos.slice(1);
    datos.push(data.mem_cons);
    chartMem.data.datasets[0].data = datos;
    chartMem.update();
}

setInterval(recDataMem,1000);