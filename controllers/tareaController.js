const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

//Crear Tareas
exports.creaTarea = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    // extraer el proyeto y comprobar si existe
    try {
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //console.log(existeProyecto);
        //Revisar si el proyecto acutal pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json('No autorizado');
        }
        /// Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(tarea);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

// Otener tareas 
exports.obtenerTareas = async (req, res) => {


    try {
        //Extraer proyecto y comprobar si existe
        const { proyecto } = req.query;
      //  console.log(req.query);
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //console.log(existeProyecto);
        //Revisar si el proyecto acutal pertenece al usuario autenticado
        // if (existeProyecto.creador.toString() !== req.usuario.id) {
        //     return res.status(401).json('No autorizado');
        // }

        // Obtener las tareas por proyecto

        const tareas = await Tarea.find({ proyecto });
        res.json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar una tarea

exports.actualizarTareas = async (req, res) => {
    try {
        //Extraer proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;
        
        // Si la tarea Existe
        let tareaExiste = await Tarea.findById(req.params.id);

        if (!tareaExiste) {
            return res.status(404).json({ msg: 'Tarea no existe' });
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // if (!existeProyecto) {
        //     res.status(404).json({ msg: 'Proyecto no encontrado' })
        // }
        // console.log(existeProyecto);

        //Revisar si el proyecto acutal pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id)
            return res.status(401).json({msg:'No autorizado'});



        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        //if (nombre) {
            nuevaTarea.nombre = nombre;
        //}

        //if (estado) {
            nuevaTarea.estado = estado;
        //}
        //Guardar la tarea

        tareaExiste = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json(tareaExiste);
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

// Eliminar una tarea

exports.eliminarTareas = async (req,res) =>{
     //Extraer proyecto y comprobar si existe
     const { proyecto } = req.query;
     console.log(req.params.id)
     console.log(proyecto);
     try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto  } = req.query;

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}