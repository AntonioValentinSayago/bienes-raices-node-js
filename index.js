//const express = require('express')
import express from "express";
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app para el servidor
const app = express();

//Routing -> Esra funcion solo se ejecuta en tipo GET
app.use('/', usuarioRoutes)

//Definir el puerto para el proyecto 
const port = 3000;
app.listen(port, ()=>{
    console.log(`El servidor esta port: ${port}`);
});

