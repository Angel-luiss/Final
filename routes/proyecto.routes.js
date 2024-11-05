const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller'); // Asegúrate de tener este archivo creado

// Ruta para crear un nuevo proyecto
router.post('/proyectos', proyectoController.createProyecto);

// Ruta para obtener todos los proyectos
router.get('/proyectos', proyectoController.getProyectos);

// Ruta para obtener un proyecto por ID
router.get('/proyectos/:id', proyectoController.getProyectoById);

// Ruta para actualizar un proyecto por ID
router.put('/proyectos/:id', proyectoController.updateProyecto);

// Ruta para eliminar un proyecto por ID
router.delete('/proyectos/:id', proyectoController.deleteProyecto);

module.exports = router;
