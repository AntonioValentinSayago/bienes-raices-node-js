import { Precio,Categoria, Propiedad } from '../models/index.js'

const inicio = async ( req, res ) => {

    const [ categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({ raw: true}),
        Precio.findAll({ raw: true}),
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId:1
            },
            include: [
                {
                    model: Precio, as: 'precio'
                }
            ],
            order: [['createdAT', 'DESC']]
        }),
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId: 2
            },
            include: [
                {
                    model: Precio, as: 'precio'
                }
            ],
            order: [['createdAt', 'DESC']]
        }),
    ])

    res.render('inicio', {
        pagina: 'Inicio', 
        categorias,
        precios,
        casas,
        departamentos
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