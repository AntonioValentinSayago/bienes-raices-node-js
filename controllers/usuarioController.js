const formualrioLogin = (req, res) => {
    res.render('auth/login',
    {
        autenticado: true
    })
};

const formularioResgistro = (req, res) => {
    res.render('auth/registro',
    {
        pagina: 'Crear Cuenta'
    })
};

export {
    formualrioLogin,
    formularioResgistro
}