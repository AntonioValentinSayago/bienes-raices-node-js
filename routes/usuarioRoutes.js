import express from "express";
import { formualrioLogin, 
        formularioResgistro,
        formularioOlvidePassword, 
        registrar,
        confirmar }
         from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formualrioLogin);
router.get('/registro', formularioResgistro)
router.post('/registro', registrar)

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword)


export default router;