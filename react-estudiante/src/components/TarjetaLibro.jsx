import { Link } from 'react-router-dom';
import { BadgeEstado } from './BadgeEstado';

export function TarjetaLibro({ libro }) {
    const { id, nombre, sede, capacidad, formatos, estado } = libro;
    const esDisponible = estado === 'disponible';

    return (
        <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary-subtle text-secondary border">
                        Sede: {sede}
                    </span>
                    <BadgeEstado estado={estado} />
                </div>

                <h5 className="card-title text-truncate-2" title={nombre}>
                    {nombre}
                </h5>

                <p className="card-text text-muted small mb-3">
                    Ejemplares disponibles: <strong>{capacidad}</strong>
                </p>

                <div className="mb-3">
                    <small className="text-muted d-block mb-1">Formatos:</small>
                    <div className="d-flex flex-wrap gap-1">
                        {formatos.map((fmt, i) => (
                            <span key={i} className="badge bg-light text-dark border">
                                {fmt}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-3 border-top d-flex gap-2">
                    <Link to={`/catalogo/${id}`} className="btn btn-sm btn-outline-secondary flex-fill">
                        Detalles
                    </Link>
                    {esDisponible && (
                        <Link to={`/nueva-reserva?libroId=${id}`} className="btn btn-sm btn-danger flex-fill">
                            Prestar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}