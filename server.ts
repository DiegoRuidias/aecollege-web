import express from 'express';
import path from 'path';

const app = express();

// Cambia el nombre del proyecto en `dist/nombre-del-proyecto/browser`
app.use(express.static(path.join(__dirname, '../dist/aecollege-web/browser')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/aecollege-web/browser/index.html'));
});

// Configura el puerto desde `process.env.PORT` o usa un valor por defecto
const port = parseInt(process.env["PORT"] || "10000", 10);
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
