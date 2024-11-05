import React, { useState, useEffect } from 'react';

const Productos = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [completada, setCompletada] = useState(false);
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [prioridad, setPrioridad] = useState('media');
    const [asignadoA, setAsignadoA] = useState('');
    const [categoria, setCategoria] = useState('');
    const [costoProyecto, setCostoProyecto] = useState('');
    const [pagado, setPagado] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [proyectos, setProyectos] = useState([]); // Estado para almacenar los proyectos guardados

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];
        setFechaCreacion(fechaActual);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear un nuevo proyecto y agregarlo a la lista
        const nuevoProyecto = {
            id: Date.now(),
            titulo,
            descripcion,
            completada,
            fechaCreacion,
            fechaVencimiento,
            prioridad,
            asignadoA,
            categoria,
            costoProyecto,
            pagado
        };

        setProyectos([...proyectos, nuevoProyecto]);
        setMensaje('¡El proyecto ha sido guardado exitosamente!');

        // Limpiar el formulario después de enviar
        setTitulo('');
        setDescripcion('');
        setCompletada(false);
        setFechaVencimiento('');
        setPrioridad('media');
        setAsignadoA('');
        setCategoria('');
        setCostoProyecto('');
        setPagado(false);

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setMensaje(''), 3000);
    };

    const handlePayment = () => {
        alert("Simulación de pago exitoso con Stripe o PayPal");
        setPagado(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registro de Proyecto</h2>

            {/* Mostrar mensaje de confirmación si existe */}
            {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Título (Nombre breve del proyecto)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción (Información detallada del proyecto)</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Completada (Estado del proyecto)</label>
                    <input
                        type="checkbox"
                        className="form-check-input ms-2"
                        checked={completada}
                        onChange={(e) => setCompletada(e.target.checked)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de Creación</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaCreacion}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de Vencimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Prioridad (Nivel de prioridad)</label>
                    <select
                        className="form-select"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                    >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Asignado a (Responsable del proyecto)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={asignadoA}
                        onChange={(e) => setAsignadoA(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoría (Clasificación del proyecto)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Costo del Proyecto (Q)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={costoProyecto}
                        onChange={(e) => setCostoProyecto(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Estado de Pago</label>
                    <p>{pagado ? "Pagado" : "Pendiente de Pago"}</p>
                    {!pagado && (
                        <button type="button" className="btn btn-success" onClick={handlePayment}>
                            Pagar ahora con Stripe/PayPal
                        </button>
                    )}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Guardar Proyecto</button>
            </form>

            {/* Sección de proyectos guardados */}
            <div className="mt-5">
                <h3 className="text-center">Proyectos Guardados</h3>
                <ul className="list-group">
                    {proyectos.map((proyecto) => (
                        <li key={proyecto.id} className="list-group-item">
                            <h5>{proyecto.titulo}</h5>
                            <p><strong>Descripción:</strong> {proyecto.descripcion || 'N/A'}</p>
                            <p><strong>Completada:</strong> {proyecto.completada ? 'Sí' : 'No'}</p>
                            <p><strong>Fecha de Creación:</strong> {proyecto.fechaCreacion}</p>
                            <p><strong>Fecha de Vencimiento:</strong> {proyecto.fechaVencimiento || 'N/A'}</p>
                            <p><strong>Prioridad:</strong> {proyecto.prioridad}</p>
                            <p><strong>Asignado a:</strong> {proyecto.asignadoA || 'N/A'}</p>
                            <p><strong>Categoría:</strong> {proyecto.categoria || 'N/A'}</p>
                            <p><strong>Costo del Proyecto:</strong> Q{proyecto.costoProyecto}</p>
                            <p><strong>Estado de Pago:</strong> {proyecto.pagado ? 'Pagado' : 'Pendiente'}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Productos;
