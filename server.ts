import express from 'express';
import path from 'path';

const app = express();

// Cambia 'nombre-de-tu-proyecto' por el nombre exacto de tu proyecto en la carpeta dist
app.use(express.static(path.join(__dirname, 'dist/nombre-de-tu-proyecto')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/nombre-de-tu-proyecto/index.html'));
});

// Convierte `PORT` a un número, usando 10000 como valor por defecto
const port = parseInt(process.env["PORT"] || "10000", 10);
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
