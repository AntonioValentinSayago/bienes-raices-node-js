import express from "express";
import { formualrioLogin, formularioResgistro } from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formualrioLogin);
router.get('/registro', formularioResgistro)


export default router;