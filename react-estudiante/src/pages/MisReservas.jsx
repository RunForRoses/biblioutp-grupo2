import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRequest } from 'alova/client';
import { useAuth } from '../context/AuthContext';
import { usePrestamos } from '../hooks/usePrestamos.js';
import { getResumenEstudiante } from '../services/alovaClient.js';
import { BadgeEstado } from '../components/BadgeEstado';

export function MisReservas() {
    const { usuario } = useAuth();
    const { datos: misPrestamos, cargando, error, cancelar, recargar } = usePrestamos(usuario?.id);
    const { data: resumen, loading: cargandoResumen, send: actualizarResumen } = useRequest(
        () => getResumenEstudiante(usuario.id),
        { initialData: [] }
    );
    const [segundosRestantes, setSegundosRestantes] = useState(600);

    useEffect(() => {
        document.title = 'BiblioUTP - Mis Préstamos';
        const temporizador = setInterval(() => {
            setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(temporizador);
    }, []);

    const formatoTiempo = (seg) => {
        const m = Math.floor(seg / 60).toString().padStart(2, '0');
        const s = (seg % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const contarPorEstado = (estado) => resumen.filter((p) => p.estado === estado).length;

    const handleCancelar = async (id) => {
        await cancelar(id);
        actualizarResumen();
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                    <h1 className="h3 fw-bold mb-1">Mis Solicitudes y Préstamos</h1>
                    <p className="text-muted mb-0">Sincronizado con el servidor (actualiza cada 15 s).</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => { recargar(); actualizarResumen(); }}>
                        🔄 Actualizar
                    </button>
                    <Link to="/nueva-reserva" className="btn btn-danger">+ Nuevo Préstamo</Link>
                </div>
            </div>

            {/* Resumen con Alova + Caché */}
            <div className="card border-0 shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <span className="fw-bold">Resumen:</span>
                    {cargandoResumen ? (
                        <span className="text-muted small">Actualizando resumen...</span>
                    ) : (
                        <div className="d-flex gap-2 flex-wrap">
                            <span className="badge bg-success">Aprobadas: {contarPorEstado('aprobada')}</span>
                            <span className="badge bg-warning text-dark">Pendientes: {contarPorEstado('pendiente')}</span>
                            <span className="badge bg-danger">Rechazadas: {contarPorEstado('rechazada')}</span>
                            <span className="badge bg-primary">Devueltos: {contarPorEstado('devuelto')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="alert alert-info d-flex align-items-center justify-content-between shadow-sm">
                <span><strong>⏱️ Tiempo límite de recogida en ventanilla</strong></span>
                <span className="badge bg-primary fs-6 px-3 py-2 font-monospace">{formatoTiempo(segundosRestantes)}</span>
            </div>

            {cargando ? (
                <div className="text-center py-4"><div className="spinner-border text-danger" /></div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : misPrestamos.length === 0 ? (
                <div className="card p-5 text-center border-0 shadow-sm">
                    <p className="text-muted fs-5 mb-3">Aún no tienes préstamos ni reservas activas.</p>
                    <div><Link to="/catalogo" className="btn btn-outline-danger">Explorar Catálogo</Link></div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Código</th><th>Libro</th><th>Formato</th><th>Fecha</th><th>Horario</th><th>Estado</th><th>Acción</th>
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
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancelar(p.id)}>
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