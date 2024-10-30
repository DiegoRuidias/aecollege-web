"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Cambia 'nombre-de-tu-proyecto' por el nombre exacto de tu proyecto en la carpeta dist
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist/aecollege-web/browser')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist/aecollege-web/browser/index.html'));
});
// Convierte `PORT` a un número, usando 10000 como valor por defecto
const port = parseInt(process.env["PORT"] || "10000", 10);
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
