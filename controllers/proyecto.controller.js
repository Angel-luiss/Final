const pool = require('../config/db'); // Asegúrate de que esta ruta apunte correctamente a db.js

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
    const { titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, pagado } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO proyectos (titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, pagado)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [titulo, descripcion, completada || false, fecha_vencimiento, prioridad || 'media', asignado_a, categoria, costo_proyecto, pagado || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el proyecto' });
    }
};

// Obtener todos los proyectos
exports.getProyectos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM proyectos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Obtener un proyecto por ID
exports.getProyectoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM proyectos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
};

// Actualizar un proyecto por ID
exports.updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, pagado } = req.body;
    try {
        const result = await pool.query(
            `UPDATE proyectos SET titulo = $1, descripcion = $2, completada = $3, fecha_vencimiento = $4, prioridad = $5, 
             asignado_a = $6, categoria = $7, costo_proyecto = $8, pagado = $9 WHERE id = $10 RETURNING *`,
            [titulo, descripcion, completada, fecha_vencimiento, prioridad, asignado_a, categoria, costo_proyecto, pagado, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto por ID
exports.deleteProyecto = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM proyectos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};
