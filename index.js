import express from "express";
import cookieParser from 'cookie-parser'
import csrf from 'csurf';

import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'

//Crear la app para el servidor
const app = express();

// Habilita la lectura de datos de los fomrularios
app.use(express.urlencoded({extended: true}));

// habilitamos cookieParre
app.use( cookieParser( ))

// habilitar csrf
app.use( csrf({cookie: true}) )

//conexion a la base de datos
try {
    await db.authenticate();
    db.sync()  // -> Se crea la tabla en caso de que no exista
    console.log("Conexion a la base de datos");
} catch (error) {
    console.log(error);
}

//Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views')

//Carpetas Publica  -> contenedor de archivos estaticos como css- js- img
app.use( express.static('public'))

//Routing -> Esta funcion solo se ejecuta en tipo GET
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)
app.use('/api', apiRoutes)

//Definir el puerto para el proyecto 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`El servidor esta port: ${port}`));

