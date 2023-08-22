import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js';

const formualrioLogin = (req, res) => {
    res.render('auth/login',
    {
        pagina: 'Iniciar Sesión'
    })
};

const formularioResgistro = (req, res) => {
    res.render('auth/registro',
    {
        pagina: 'Crear Cuenta'
    })
};

const registrar = async (req, res) => {
    
    // Validción del Formulario de Registro
    await check('nombre').notEmpty().withMessage('El nombre es Obligario').run(req)
    await check('email').isEmail().withMessage('El Email no es valido').run(req)
    await check('password').isLength({ min: 6}).withMessage('El password tiene que ser al menos de 6 caracteres').run(req)
    await check('repetir-password').equals('password').withMessage('Los password no son iguales').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este Vacio
    if(!resultado.isEmpty()){

        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array()
        })
    }

    const usuario = await Usuario.create(req.body)
    res.json(usuario)

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', 
    {
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
};

export {
    formualrioLogin,
    formularioResgistro,
    registrar,
    formularioOlvidePassword
}