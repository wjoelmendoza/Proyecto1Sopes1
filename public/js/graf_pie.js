

Chart.defaults.global.defaultFontFamily = 'Numito', '-apple-system,system-ui,BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796'
let graf = document.getElementById('graficaTop10');
let lbl = -20;
let contproc = 0;
let myPieChart = new Chart(graf, {
    type: 'pie',
    data: {
        labels: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8", "cat9", "cat"],
        datasets: [{
            data: [25, 35, 25, 20, 22, 23, 33, 22, 35, 25],
            backgroundColor: ["#7FFF00", "#90EE90", "#20B2AA", "#DC143C", "#FFA07A", "#FF00FF", "#FFD700", "#FFA500", "#9ACD32", "#008080"],
            hoverBackgroundColor: [],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: true,
            position: 'left'
        }
    },
});


function recDataProc() {
    $.get('/api/grafica_pie', {}, refrescarGrafico)
}

function refrescarGrafico(data, status) {
    if (!status)
        return

    let etiquetas = [], valores = [];

    let dt = data.datos;
    if (dt != undefined) {
        let ct;
        for (let i = 0; i < dt.length; i++) {
            ct = dt[i];
            etiquetas.push(ct.categoria);
            valores.push(ct.cantidad);
        }
    }

    myPieChart.data.labels = etiquetas;
    myPieChart.data.datasets[0].data = valores;
    myPieChart.update();
}

setInterval(recDataProc, 4000);