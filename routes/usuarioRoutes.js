import express from "express";
import { formualrioLogin, 
        autenticar,
        formularioResgistro,
        formularioOlvidePassword, 
        registrar,
        confirmar,
        resetPassword,
        comprobarToken,
        nuevoPassword
 }
         from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formualrioLogin);
router.post('/login', autenticar);

router.get('/registro', formularioResgistro)
router.post('/registro', registrar)

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPassword)

// Todo: Almacena el nueo password
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)


export default router;