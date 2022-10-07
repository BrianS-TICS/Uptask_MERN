import express from 'express';
import conectarBD from './config/db.js';
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js"

const app = express(); // Necesario para inicializar el uso de express

app.use(express.json()); // Necesario para leer requests de formato json

dotenv.config(); // Necesario para usar variables de entorno en el proyecto

conectarBD(); // Necesario para la conexion a la base de datos por mongoose en este proyecto

// Routing
app.use('/api/usuarios', usuarioRoutes); // use sirve para leer todos los tipos de request
// '/api/usuarios toma el archivo de rutas > el archivo de rutas toma el controlador <registrar> por ejemplo > el controlador maneja el request'

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en ${PORT}`);
})
