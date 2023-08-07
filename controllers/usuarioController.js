const formualrioLogin = (req, res) => {
    res.render('auth/login',
    {
        autenticado: true
    })
};

const formularioResgistro = (req, res) => {
    res.render('auth/registro',
    {
        
    })
};

export {
    formualrioLogin,
    formularioResgistro
}