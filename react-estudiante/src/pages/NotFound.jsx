import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
    useEffect(() => {
        document.title = 'BiblioUTP - Página no encontrada (404)';
    }, []);

    return (
        <div className="container py-5 text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="h4 fw-bold mb-3">Página no encontrada</h2>
            <p className="text-muted mb-4">La ruta que intentas consultar no existe en BiblioUTP</p>
            <Link to="/catalogo" className="btn btn-danger">
                Ir al Catálogo de Libros
            </Link>
        </div>
    );
}