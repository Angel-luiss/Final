const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const proyectoRoutes = require('./routes/proyecto.routes');

const app = express();
const port = 3001;

// Configurar PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practicaclase_db',  // Cambia el nombre de la base de datos si es necesario
    password: '12345678',          // Cambia la contraseña según tu configuración
    port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Clave secreta para JWT
const JWT_SECRET = 'mi_clave_secreta_super_segura';

// Ruta de registro
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
};

// Rutas de Proyecto
app.use('/api', proyectoRoutes);

// Ruta protegida
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso a ruta protegida' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
