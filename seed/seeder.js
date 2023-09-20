import { exit } from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import db from '../config/db.js'
import { Categoria, Precio, Usuario } from '../models/index.js'

const importarDatos = async () => {
    try {
        // Autenticar 
        await db.authenticate()

        // Generar las Columnas
        
        await db.sync()

        // Insertamos los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])

        console.log('Datos Importados Correctamente')
        exit()
        
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

// ? Validamos cuando le pasamos comandos desde la Terminal 
if(process.argv[2] === "-i") {
    importarDatos();
}

// if(process.argv[2] === "-e") {
//     eliminarDatos();
// }
