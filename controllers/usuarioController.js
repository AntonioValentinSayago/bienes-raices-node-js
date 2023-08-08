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