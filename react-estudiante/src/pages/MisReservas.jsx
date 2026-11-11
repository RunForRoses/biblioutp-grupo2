import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BadgeEstado } from '../components/BadgeEstado';

export function MisReservas({ prestamos, onCancelarPrestamo }) {
    const { usuario } = useAuth();
    const [segundosRestantes, setSegundosRestantes] = useState(600);

    useEffect(() => {
        document.title = 'BiblioUTP - Mis Préstamos';

        const temporizador = setInterval(() => {
            setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Limpia el temporizador
        return () => clearInterval(temporizador);
    }, []);

    const formatoTiempo = (segundos) => {
        const min = Math.floor(segundos / 60).toString().padStart(2, '0');
        const seg = (segundos % 60).toString().padStart(2, '0');
        return `${min}:${seg}`;
    };

    const misPrestamos = prestamos.filter((p) => p.usuarioId === usuario?.id);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1 className="h3 fw-bold mb-1">Mis Solicitudes y Préstamos</h1>
                    <p className="text-muted mb-0">Revisa el estado de tus libros reservados y activos.</p>
                </div>
                <Link to="/nueva-reserva" className="btn btn-danger">
                    + Nuevo Préstamo
                </Link>
            </div>

            {/* Contador regresivo en vivo */}
            <div className="alert alert-info d-flex align-items-center justify-content-between shadow-sm">
                <div>
                    <strong>⏱️ Tiempo límite de recogida en ventanilla:</strong>{' '}
                    <span>Tienes hasta el final del temporizador para retirar tus ejemplares aprobados.</span>
                </div>
                <span className="badge bg-primary fs-6 px-3 py-2 font-monospace">
                    {formatoTiempo(segundosRestantes)}
                </span>
            </div>

            {misPrestamos.length === 0 ? (
                <div className="card p-5 text-center border-0 shadow-sm">
                    <p className="text-muted fs-5 mb-3">Aún no tienes préstamos ni reservas activas.</p>
                    <div>
                        <Link to="/catalogo" className="btn btn-outline-danger">Explorar Catálogo</Link>
                    </div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle mb-0 bg-white">
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Libro</th>
                                <th>Formato</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {misPrestamos.map((p) => (
                                <tr key={p.id}>
                                    <td className="fw-bold font-monospace">{p.codigo}</td>
                                    <td>{p.libro}</td>
                                    <td><span className="badge bg-light text-dark border">{p.formato}</span></td>
                                    <td>{p.fecha}</td>
                                    <td>{p.horaInicio} - {p.horaFin}</td>
                                    <td><BadgeEstado estado={p.estado} /></td>
                                    <td>
                                        {p.estado === 'pendiente' && (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onCancelarPrestamo(p.id)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}