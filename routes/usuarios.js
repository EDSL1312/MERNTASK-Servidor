// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator')

// Crea un usuario
// Aapi/usuarios

router.post('/', 
        [
            check('nombre','El nombre es Obligatorio!').not().isEmpty(),
            check('email','Agrega un email valido').isEmail(),
            check('password','El password deber minimo de 6 caracteres').isLength({min:6})
        ],
    //         ()=>{ 
    // console.log('creando Usuarios!!')}
    usuarioController.crearUsuaro
);

module.exports = router;