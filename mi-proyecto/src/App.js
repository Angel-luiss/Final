// src/App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Productos from './components/Productos';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                navigate('/productos');
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión:", error);
            setError("Error al conectar con el servidor. Por favor, inténtalo de nuevo.");
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <Routes>
                {!token ? (
                    <Route path="/" element={
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button type="submit" className="btn btn-primary">
                                Iniciar sesión
                            </button>
                        </form>
                    } />
                ) : (
                    <Route path="/productos" element={<Productos />} />
                )}
            </Routes>
            {token && (
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            )}
        </div>
    );
};

export default App;
