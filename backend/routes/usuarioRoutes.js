import express from "express";
import { registrar, autenticar } from "../controllers/usuario.Controller.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post('/', registrar); // Crea nuevo usuario
router.post('/login', autenticar);

export default router;