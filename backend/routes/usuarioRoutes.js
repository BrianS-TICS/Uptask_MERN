import express from "express";
import { registrar } from "../controllers/usuario.Controller.js";

const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios
router.post('/', registrar); // Crea nuevo usuario


export default router;