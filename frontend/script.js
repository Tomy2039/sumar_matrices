function crearMatrices() {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    const contenido = document.getElementById("matrices");

    if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
        alert("Ingresa valores validos");
        return;
    }

    contenido.innerHTML = "<h3>Matriz 1</h3>";
    for (let i = 0; i < filas; i++) {
        for ( let j = 0; j< columnas; j++) {
            contenido.innerHTML += `<input type="number" id="m1-${i}-${j}" required>`;
        }
        contenido.innerHTML += "<br>";
    }
    contenido.innerHTML += "<h3>+</h3>"
    contenido.innerHTML += "<h3>Matriz 2</h3>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            contenido.innerHTML += `<input type="number" id="m2-${i}-${j}" required>`;
        }
        contenido.innerHTML += "<br>";
    }
}

function enviarMatrices() {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);

    const matriz1 = [];
    const matriz2 = [];

    for (let i = 0; i < filas; i++) {
        let fila1 = [];
        let fila2 = [];
        for (let j = 0; j < columnas; j++) {
            const valor1 = document.getElementById(`m1-${i}-${j}`).value;
            const valor2 = document.getElementById(`m2-${i}-${j}`).value;

            if (valor1 === "" || valor2 === "" || isNaN(valor1) || isNaN(valor2)) {
                alert("Los campos deben estar completados y ser numeros");
                return;
            }

            fila1.push(Number(valor1));
            fila2.push(Number(valor2));
        }
        matriz1.push(fila1);
        matriz2.push(fila2);
    }

    fetch('/suma_matriz', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(res => res.json())
    .then(data => mostrarResultado(data.resultado))
    .catch(error => console.error('Error:', error));
}

function mostrarResultado(matriz_total) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";
    matriz_total.forEach(fila => {
        fila.forEach(num => {
            contenedor.innerHTML += `<span>${num}</span>`;
        });
        contenedor.innerHTML += "<br>";
    });
}