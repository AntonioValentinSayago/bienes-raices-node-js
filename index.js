import express from "express";
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app para el servidor
const app = express();

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

