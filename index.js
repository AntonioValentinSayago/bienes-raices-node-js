import express from "express";
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//Crear la app para el servidor
const app = express();

// Habilita la lectura de datos de los fomrularios
app.use(express.urlencoded({extended: true}));

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
app.use('/auth', usuarioRoutes)

//Definir el puerto para el proyecto 
const port = 3000;
app.listen(port, () => console.log(`El servidor esta port: ${port}`));

