import express from "express";
import { formualrioLogin } from "../controllers/usuarioController";

const router = express.Router();

router.get('/login', formualrioLogin);


export default router;