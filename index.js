const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')


// crear el servidor
const app = express();

// conectar ala base de datos

conectarDB();

//Hailitar CORS
app.use(cors());

// Habilar Exprress.json
app.use(express.json({ extended: true }));

// puerto de la app
const port = process.env.port || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tarea'));

// dEFINIR LA PÁGINA PRINCIPAL
// app.get('/',(req,res)=>{
//     res.send('Hola Munto');
// });
// arrancar la app
app.listen(port, '0.0.0.0' , () => {
    console.log(`el servidor está funcionando el en puertoo ${PORT}`);
})