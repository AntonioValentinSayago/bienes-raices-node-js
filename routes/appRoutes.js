import  express  from "express";
import { inicio,
    categorias,
    noEncontrado,
    buscador }
    from '../controllers/appController.js'

const router = express.Router()

// ? Pagina de Inicio
router.get('/', inicio)

// ? Pagina de Categoría
router.get('/categorias/:id', categorias)

// ? Pagina de 404
router.get('/404', noEncontrado)

//? Pagina de Buscdor
router.get('/buscador', buscador)


export default router;
