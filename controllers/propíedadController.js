
const admin = ( req, res ) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    })
}

// Formulario para crea nueva propiedades
const crear = ( req, res ) => {
    res.render('propiedades/crear', {
        pagina: 'Crar Propiedades',
        barra: true
    })
}

export {
    admin,
    crear
}