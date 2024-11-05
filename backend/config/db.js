// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practicaclase_db',  // Cambia el nombre de la base de datos si es necesario
    password: '12345678',          // Cambia la contraseña según tu configuración
    port: 5432,
});

module.exports = pool;
