import { Precio,Categoria, Propiedad } from '../models/index.js'

const inicio = async ( req, res ) => {

    const [ categorias, precios ] = await Promise.all([
        Categoria.findAll({ raw: true}),
        Precio.findAll({ raw: true})
    ])

    res.render('inicio', {
        pagina: 'Inicio', 
        categorias,
        precios
    })
}

const categorias = ( req, res ) => {
    
}

const noEncontrado = ( req, res ) => {
    
}

const buscador = ( req, res ) => {
    
}

export{
    inicio,
    categorias,
    noEncontrado,
    buscador
}