Chart.defaults.global.defaultFontFamily = 'Numito', '-apple-system,system-ui,BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'
let grafproc = document.getElementById('grafProcesador');
let lbl = -20;
let contproc = 0;
let chartProc = new Chart(grafproc, {
    type: 'line',
    data: {
        labels: [lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1,
        lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1, lbl += 1],
        datasets: [{
            label: "Porcentaje usado",
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
                        return value + " %"
                    }
                }
            }],
        },
        legend : {
            display: false
        },
        tooltips:{
            callbacks: {
                label: (tooltipItem, chart)=>{
                    let datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel +':' + tooltipItem.yLabel.toFixed(2) + '%'
                }
            }
        }
    }
},

);


function recDataProc(){
    $.get('/uso_proc',{}, refrescarGrafico)
}

function refrescarGrafico(data, status){
    if(!status)
        return
    
    let lbls = chartProc.data.labels;
    lbls.push(lbl+=1);
    lbls = lbls.slice(1);
    chartProc.data.labels = lbls;

    let datos = chartProc.data.datasets[0].data;
    datos = datos.slice(1)
    datos.push(data.porcentaje)
    chartProc.data.datasets[0].data = datos
    chartProc.update();
}

setInterval(recDataProc,1000);