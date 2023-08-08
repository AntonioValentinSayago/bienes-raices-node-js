import express from "express";
import { formualrioLogin, formularioResgistro, formularioOlvidePassword, registrar } from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formualrioLogin);
router.get('/registro', formularioResgistro)
router.post('/registro', registrar)

router.get('/olvide-password', formularioOlvidePassword)


export default router;