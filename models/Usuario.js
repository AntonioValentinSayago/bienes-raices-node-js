import { DataTypes, Sequelize } from 'sequelize'
import db from '../config/db.js'

const Usuario = db.define('usuarios', {

    nombre: {
        type: DataTypes.STRING, // Se define el tipo de dato
        allowNull: false  //Este campo no puedo ir vacio
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN

})

export default Usuario;
