from flask import Flask, send_from_directory, request, jsonify
import os

frontend_dir = os.path.abspath('../frontend')

app = Flask(__name__, static_folder=frontend_dir, static_url_path='')

@app.route('/')
def index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/suma_matriz', methods=['POST'])
def suma_matriz():
    data = request.json
    matriz1 = data['matriz1']
    matriz2= data['matriz2']

    filas = len(matriz1)
    columnas = len(matriz1[0])

    resultado = []
    for i in range(filas):
        fila = []
        for j in range(columnas):
            suma = matriz1[i][j] + matriz2[i][j]
            fila.append(suma)
        resultado.append(fila)
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
