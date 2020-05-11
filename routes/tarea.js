const express =require('express');
const router = express.Router();
const tareaController  = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')


// Crea un tarea
// Api/tareas
router.post('/',
auth,
[
    check('nombre','El nombre del proyecto es obligatorio!').not().isEmpty(),
    check('proyecto','El proyecto del proyecto es obligatorio!').not().isEmpty()
],
tareaController.creaTarea
)

// Obtener las tareas por proyectos

router.get('/',
auth,
tareaController.obtenerTareas
)

// Actualizar tarea
router.put('/:id',
auth,
tareaController.actualizarTareas
)

// Eliminar tarea
router.delete('/:id',
auth,
tareaController.eliminarTareas
)



module.exports= router;