import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokes.js';
import { emailRegistro } from '../helpers/emails.js';

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
    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El Password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Los Passwords no son iguales').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este Vacio
    if(!resultado.isEmpty()){

        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // ? Extraer los Datos
    const { nombre, email,password } = req.body

    // ? Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne( { where: { email: email }})

    if (existeUsuario) {
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: [{ msg: 'El usuario ya esta Registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    //? Enviar EMAIL de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    // ? Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Te enviamos un correo para confirmar tu cuenta'
    })

}

//? Funcion para validar una cuenta
const confirmar = async( req, res ) => {

    const { token } = req.params

    //? Verificar si el token es valido
    const usuario = await Usuario.findOne( { where: { token } })

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un erro al confirmar tu cuenta',
            error: true
        })
    }

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
    confirmar,
    formularioOlvidePassword
}