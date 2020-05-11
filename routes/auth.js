// rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const authController = require('../controllers/authControler')
const auth = require('../middleware/auth')

// Iniciar sesión
// Api/auth

router.post('/', 
        //[
         //   check('email','Agrega un email valido').isEmail(),
          //  check('password','El password deber minimo de 6 caracteres').isLength({min:6})
        //],
    //         ()=>{ 
    // console.log('creando Usuarios!!')}
    authController.autenticarUsuario
);

//Obtiene el usuario autenticado
router.get('/', 
        auth,
    authController.usuarioAutenticado
);


module.exports = router;