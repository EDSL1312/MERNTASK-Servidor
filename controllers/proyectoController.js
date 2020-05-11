const Proyecto = require('../models/Proyecto');
const {validationResult}= require('express-validator')
exports.creaProyecto = async (req,res)=>{
     //Revisar si hay errores
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()})
     }
    try {
        // crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        // guardar el  creador 
        proyecto.creador = req.usuario.id;
        
        // guardar usuario
        await proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}

// obtiene todos los proyectos del usuario actual
exports.obtenerProyectos =async(req,res)=>{
    try {
        //console.log(req.usuario);
        const proyectos= await Proyecto.find({creador: req.usuario.id}).sort({creado:-1});
        res.json({proyectos});
        
    } catch (error) {
        res.status(500).send('Proyecto no encontrado');
    }

} 
//Actualiza un proyecto
exports.actualizarProyecto = async(req,res)=>{
     //Revisar si hay errores
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()})
     }
     // extraer la informacion del proyecto
     const {nombre} = req.body;
     const nuevoProyecto ={};
     if (nombre) {
         nuevoProyecto.nombre=nombre;
     }

    try {
        // REvisar el ID
        //console.log(req.params.id)
        let proyecto = await Proyecto.findById(req.params.id);
        // Revisar el proyecto si existe
        if(!proyecto){
            return res.status(400).json('Proyecto no encontrado');
        }
        // verrificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json('No autorizado');
        }

        //Actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set:nuevoProyecto},{new:true})
        res.json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// Eliminar un proycto
exports.eliminarProyeto = async (req,res) =>{
    try {
         // REvisar el ID
        //console.log(req.params.id)
        let proyecto = await Proyecto.findById(req.params.id);
        // Revisar el proyecto si existe
        if(!proyecto){
            return res.status(400).json('Proyecto no encontrado');
        }
        // verrificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json('No autorizado');
        }

        //Eliminar
        proyecto = await Proyecto.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Proyecto Eliminado'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}