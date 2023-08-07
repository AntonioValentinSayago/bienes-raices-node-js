
const formualrioLogin = (req, res) => {
    res.render('auth/login',
    {
        autenticado: true
    })
};

export {
    formualrioLogin
}