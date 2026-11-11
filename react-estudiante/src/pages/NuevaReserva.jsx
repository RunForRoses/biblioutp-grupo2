import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormularioPrestamo } from '../components/FormularioPrestamo';

export function NuevaReserva({ libros = [], prestamos = [], onAgregarPrestamo }) {
    const { usuario } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const libroIdParam = Number(searchParams.get('libroId'));
    const libroInicial = libros.find((l) => l.id === libroIdParam);

    useEffect(() => {
        document.title = 'BiblioUTP - Nueva Solicitud de Préstamo';
    }, []);

    const handleGuardar = (nuevoPrestamo) => {
        onAgregarPrestamo(nuevoPrestamo);
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

            <FormularioPrestamo
                libroInicial={libroInicial}
                libros={libros}
                prestamosExistentes={prestamos}
                usuario={usuario}
                onGuardar={handleGuardar}
            />
        </div>
    );
}
