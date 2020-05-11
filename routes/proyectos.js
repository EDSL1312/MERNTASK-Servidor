const express =require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')
// Crea un usuario
// Api/auth

router.post('/',auth,
[
    check('nombre','el nombre del proyecto es obligatorio!').not().isEmpty()
],
proyectoController.creaProyecto
)
//Obtener todos los proyectos
router.get('/',auth,
proyectoController.obtenerProyectos
)
// Actualiza uun proyecto por ID
router.put('/:id',
auth,
[
    check('nombre','el nombre del proyecto es obligatorio!').not().isEmpty()
],
    proyectoController.actualizarProyecto
)


//Eliminar un proyecto
router.delete('/:id',
auth,
    proyectoController.eliminarProyeto
)

module.exports = router;