document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.navegacion').classList.toggle('show');
});
function puntoFijo() {
    var funcionText = document.getElementById("funcion").value;
    var x0 = parseFloat(document.getElementById("x0").value);
    var tolerancia = parseFloat(document.getElementById("tolerancia").value);
    var maxIteraciones = 100;
    var iteracion = 0;
    var error = 1.0;
    var resultado = "";
    var datosGrafico = [];

    // Crear una función a partir del texto ingresado
    var funcion = new Function("x", "return " + funcionText);

    while (error > tolerancia && iteracion < maxIteraciones) {
        var xNuevo = funcion(x0);
        error = Math.abs(xNuevo - x0);
        x0 = xNuevo;
        iteracion++;
        resultado += "Iteración " + iteracion + ": x = " + x0.toFixed(4) + ", error = " + error.toFixed(4) + "<br>";
        datosGrafico.push({ iteracion: iteracion, x: x0 });
    }

    // Agregar la primera iteración al resultado
    resultado = "Iteración 0: x = " + document.getElementById("x0").value + ", error = 0.0<br>" + resultado;

    document.getElementById("resultado").innerHTML = resultado;

    // Dibujar gráfico
    var ctx = document.getElementById('grafico').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datosGrafico.map(data => data.iteracion),
            datasets: [{
                label: 'Convergencia',
                data: datosGrafico.map(data => data.x),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Iteración'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'x'
                    }
                }
            }
        }
    });

    // Redibujar el gráfico al cambiar el tamaño de la ventana
    window.addEventListener('resize', function () {
        myChart.update();
    });
}
