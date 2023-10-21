import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt'
import { generarId, generarJWT } from '../helpers/tokes.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

const formualrioLogin = (req, res) => {
    res.render('auth/login',
        {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
        })
};

const autenticar = async (req, res) => {

    //! Validacion
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').notEmpty().withMessage('El Password es Obligatorio').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este Vacio
    if (!resultado.isEmpty()) {

        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    // Todo: comprobar si el usuario existe
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ where: { email: email } })
    if (!usuario) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{ msg: ' El usuario no Existe' }],
        })
    }

    if (!usuario.confirmado) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'Tu cuenta no ha sido confirmada' }],
        })
    }

    // Revisar el Password 
    if (!usuario.verificarPassword(password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El password es Incorrecto' }],
        })
    }

    // ! Autenticar al Usuario
    const token = generarJWT(usuario.id)
    // Todo: Alacenar en el Cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true
    }).redirect('/mis-propiedades')

}


//* CERRAR SESION
const cerrarSesion = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/auth/login')
}
const formularioResgistro = (req, res) => {

    res.render('auth/registro',
        {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken()
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
    if (!resultado.isEmpty()) {

        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // ? Extraer los Datos
    const { nombre, email, password } = req.body

    // ? Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { email: email } })

    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
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
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Te enviamos un correo para confirmar tu cuenta'
    })

}

//? Funcion para validar una cuenta
const confirmar = async (req, res) => {

    const { token } = req.params;

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();


    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó Correctamente'
    })

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password',
        {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
        })
};

const resetPassword = async (req, res) => {
    // Validción del Formulario de Registro
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)

    let resultado = validationResult(req)

    //Todo: Verificar que el resultado este Vacio
    if (!resultado.isEmpty()) {

        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    // ? Buscar el Usuario
    const { email } = req.body

    const usuario = await Usuario.findOne({ where: { email } })
    if (usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El Email no pertence a ningun Usuario' }]
        })
    }

    // Todo: Implement generar un Token y Enviar el Email
    usuario.token = generarId();
    await usuario.save();

    emailOlvidePassword(({
        email: Usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    }));

    // ? Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Restablce tu Password',
        mensaje: 'Te enviamos un correo para confirmar tu cuenta y con las instrucciones'
    })

}

const comprobarToken = async (req, res) => {

    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } })

    if (usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Restablece tu Password',
            mensaje: 'Hubo un error al validar tu informacion',
            error: true
        })
    }

    // Cuando el Token si Existe, se muestra un formulario
    res.render('auth/reset-password', {
        pagina: 'Restablece tu Password',
        csrfToken: req.csrfToken(),
    })

}

const nuevoPassword = async (req, res) => {

    // ! Vaidar Password
    await check('password').isLength({ min: 6 }).withMessage('El Password debe ser de al menos 6 caracteres').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este Vacio
    if (!resultado.isEmpty()) {

        return res.render('auth/reset-password', {
            pagina: 'Restablce tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ where: { token } })

    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)
    usuario.token = null

    await usuario.save()

    res.render('auth/confirmar-cuenta', {
        pagina: 'Password Restablecido',
        mensaje: 'El password se guardo correctamente'
    })
}

export {
    formualrioLogin,
    autenticar,
    cerrarSesion,
    formularioResgistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}