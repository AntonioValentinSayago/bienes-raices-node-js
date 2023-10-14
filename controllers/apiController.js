import { Propiedad, Precio, Categoria } from '../models/index.js'
const propiedades = async ( req, res ) => {

    // * Se obtienen las propiedades desde la base de datos 
    const propiedades = await Propiedad.findAll({
        include: [
            {model: Precio, as: 'precio'},
            {model: Categoria, as: 'categoria'},
        ]
    })

    res.json(propiedades)

}

export {
    propiedades
}