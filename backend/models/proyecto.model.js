// models/proyecto.model.js
module.exports = {
  createTable: async (pool) => {
      const queryText = `
          CREATE TABLE IF NOT EXISTS proyectos (
              id SERIAL PRIMARY KEY,
              titulo VARCHAR(255) NOT NULL,
              descripcion TEXT,
              completada BOOLEAN DEFAULT FALSE,
              fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              fecha_vencimiento TIMESTAMP,
              prioridad VARCHAR(50) DEFAULT 'media',
              asignado_a VARCHAR(255),
              categoria VARCHAR(255),
              costo_proyecto DECIMAL(10, 2),
              pagado BOOLEAN DEFAULT FALSE
          );
      `;
      await pool.query(queryText);
  }
};
