import { useState, useEffect } from 'react';
import { ListaLibros } from '../components/ListaLibros';
import { obtenerCatalogo } from '../services/catalogoFetch.js';

export function Catalogo() {
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState('todas');

    const cargarLibros = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerCatalogo();
            setLibros(data);
        } catch (err) {
            setError(err.message || 'No se pudo cargar el catálogo.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        document.title = 'BiblioUTP - Catálogo de Libros';
        obtenerCatalogo()
            .then((data) => setLibros(data))
            .catch((err) => setError(err.message || 'No se pudo cargar el catálogo.'))
            .finally(() => setCargando(false));
    }, []);

    const librosFiltrados = libros.filter((libro) => {
        const coincideTexto = libro.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideSede = sedeSeleccionada === 'todas' || libro.sede === sedeSeleccionada;
        return coincideTexto && coincideSede;
    });

    const sedes = ['todas', ...new Set(libros.map((l) => l.sede))];

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Catálogo Bibliográfico</h1>
                <p className="text-muted">Explora los libros disponibles en las distintas sedes de la UTP.</p>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por título del libro..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <select
                        className="form-select"
                        value={sedeSeleccionada}
                        onChange={(e) => setSedeSeleccionada(e.target.value)}
                    >
                        {sedes.map((sede) => (
                            <option key={sede} value={sede}>
                                {sede === 'todas' ? 'Todas las Sedes' : `Sede: ${sede}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {cargando ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-danger" role="status" />
                    <p className="text-muted mt-2">Cargando catálogo desde el API...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger d-flex justify-content-between align-items-center">
                    <span>{error}</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={cargarLibros}>Reintentar</button>
                </div>
            ) : (
                <ListaLibros libros={librosFiltrados} />
            )}
        </div>
    );
}