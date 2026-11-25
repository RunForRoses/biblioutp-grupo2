import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePrestamos } from '../hooks/usePrestamos.js';
import { obtenerCatalogo } from '../services/catalogoFetch.js';
import { FormularioPrestamo } from '../components/FormularioPrestamo';

export function NuevaReserva() {
    const { usuario } = useAuth();
    const { datos: prestamos, crear } = usePrestamos(usuario?.id);
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'BiblioUTP - Nueva Solicitud de Préstamo';
        obtenerCatalogo()
            .then((data) => setLibros(data))
            .finally(() => setCargando(false));
    }, []);

    const libroIdParam = Number(searchParams.get('libroId'));
    const libroInicial = libros.find((l) => l.id === libroIdParam);

    const handleGuardar = async (nuevoPrestamo) => {
        await crear(nuevoPrestamo);
        navigate('/mis-reservas');
    };

    return (
        <div className="container py-4" style={{ maxWidth: '780px' }}>
            <div className="mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li>
                        <li className="breadcrumb-item active">Nuevo Préstamo</li>
                    </ol>
                </nav>
                <h1 className="h3 fw-bold mb-1">Solicitar Préstamo de Libro</h1>
                <p className="text-muted">Completa los datos del préstamo según las normas de BiblioUTP.</p>
            </div>

            {cargando ? (
                <div className="text-center py-4"><div className="spinner-border text-danger" /></div>
            ) : (
                <FormularioPrestamo
                    libroInicial={libroInicial}
                    libros={libros}
                    prestamosExistentes={prestamos}
                    usuario={usuario}
                    onGuardar={handleGuardar}
                />
            )}
        </div>
    );
}