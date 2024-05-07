document.getElementById('puntoFijoForm').addEventListener('submit', function(event) {
    event.preventDefault();



    // Obtener los valores del formulario
    const funcion = document.getElementById('funcion').value;
    const x0 = parseFloat(document.getElementById('x0').value);
    const error = parseFloat(document.getElementById('error').value);
    const iteraciones = 6; // Número fijo de iteraciones

    // console.log('Función:', funcion);
    // console.log('Valor inicial (x0):', x0);
    // console.log('Error deseado:', error);
    // console.log('Número de iteraciones:', iteraciones);

    // Función para calcular el error
    const calcularError = (xi1, xi) => Math.abs((xi1 - xi) / xi1);

    // Realizar las iteraciones
    let xi = x0;
    let iteracion = 0;
    let resultados = '<table><tr><th>Iteración</th><th>xi</th><th>Error</th></tr>'; // Variable para almacenar los resultados en una tabla

    while (iteracion < iteraciones) {
        // Calcular xi1
        const xi1 = 0.4 * Math.exp(xi ** 2);// Calcular el próximo valor de xi utilizando la fórmula especificada

        // Calcular el error a partir de la segunda iteración
        if (iteracion > 0) {
            const errorActual = calcularError(xi1, xi);

            // console.log(`Iteración #${iteracion}: xi = ${xi.toFixed(6)}, error = ${errorActual.toFixed(6)}`);

            // Agregar resultados de cada iteración a la tabla
            resultados += `<tr><td>${iteracion}</td><td>${xi.toFixed(6)}</td><td>${errorActual.toFixed(6)}</td></tr>`;

            // Verificar si el error es menor que el deseado
            if (errorActual <= error) {
                break; // Salir del bucle si el error es menor o igual al deseado
            }
        }

        xi = xi1;
        iteracion++;
    }

    // Construir el resultado final
    resultados += `<tr><td>Resultado final</td><td colspan="2">${xi.toFixed(6)}</td></tr></table>`;

    // Mostrar resultados
    // console.log('Resultados:', resultados);
    document.getElementById('resultado').innerHTML = resultados;
});