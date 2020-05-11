const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');  
const jwt=require('jsonwebtoken');

exports.crearUsuaro = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // extraer email y pwd
    const { email, password } = req.body;


    try {
        //      Revisar que el usuario registrado sea único
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        // Crea el nuevo usuario  
        usuario = new Usuario(req.body);
        
        // Hacer Hash al PWD
        const salt = await bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash(password,salt);

        // guardar  usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload ={
            usuario:{
                id: usuario.id
            }

        };
        //Firmar el JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600 // una Hora
        }, (error,token)=>{

            if (error) {throw error;}

            // Mensaje de Confirmación 
            res.json({ token })
        }) 


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error!');

    }
}
