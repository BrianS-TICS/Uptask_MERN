import express from "express";
import { registrar, autenticar, confirmar } from "../controllers/usuario.Controller.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post('/', registrar); // Crea nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar)
//  

export default router;