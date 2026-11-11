import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BadgeEstado } from '../components/BadgeEstado';

export function DetalleLibro({ libros }) {
    const { id } = useParams();
    const libro = libros.find((l) => l.id === Number(id));

    useEffect(() => {
        document.title = libro ? `BiblioUTP - ${libro.nombre}` : 'BiblioUTP - Libro';
    }, [libro]);

    if (!libro) {
        return (
            <div className="container py-5 text-center">
                <h3>Libro no encontrado</h3>
                <p className="text-muted">El ejemplar solicitado no existe o fue retirado del catálogo.</p>
                <Link to="/catalogo" className="btn btn-primary mt-3">Volver al Catálogo</Link>
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
                    {libro.formatos.map((fmt, idx) => (
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