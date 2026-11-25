import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BadgeEstado } from '../components/BadgeEstado';
import { obtenerDetalleLibro } from '../services/catalogoFetch.js';

export function DetalleLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDetalle = async () => {
            setCargando(true);
            setError(null);
            try {
                const data = await obtenerDetalleLibro(id);
                setLibro(data);
                document.title = `BiblioUTP - ${data.nombre}`;
            } catch (err) {
                setError(err.message);
                document.title = 'BiblioUTP - Libro no encontrado';
            } finally {
                setCargando(false);
            }
        };
        cargarDetalle();
    }, [id]);

    if (cargando) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-danger" role="status" />
                <p className="text-muted mt-2">Cargando detalle del libro...</p>
            </div>
        );
    }

    if (error || !libro) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger">{error || 'Libro no encontrado'}</div>
                <Link to="/catalogo" className="btn btn-primary mt-2">Volver al Catálogo</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li>
                    <li className="breadcrumb-item active">{libro.nombre}</li>
                </ol>
            </nav>

            <div className="card shadow-sm border-0 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-secondary-subtle text-secondary border">Sede: {libro.sede}</span>
                    <BadgeEstado estado={libro.estado} />
                </div>
                <h1 className="h2 fw-bold mb-3">{libro.nombre}</h1>
                <p className="text-muted mb-4">
                    Ejemplares en estantería: <strong>{libro.capacidad} unidades</strong>
                </p>

                <h5 className="fw-semibold">Formatos de Préstamo Disponibles:</h5>
                <ul className="list-group list-group-flush mb-4">
                    {libro.formatos?.map((fmt, idx) => (
                        <li key={idx} className="list-group-item ps-0">✓ {fmt}</li>
                    ))}
                </ul>

                <div className="d-flex gap-3">
                    <Link to="/catalogo" className="btn btn-outline-secondary">← Volver al Catálogo</Link>
                    {libro.estado === 'disponible' && (
                        <Link to={`/nueva-reserva?libroId=${libro.id}`} className="btn btn-danger px-4">
                            Solicitar Préstamo
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}