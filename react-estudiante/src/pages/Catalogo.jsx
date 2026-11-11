import { useState, useEffect } from 'react';
import { ListaLibros } from '../components/ListaLibros';

export function Catalogo({ libros = [] }) {
    const [busqueda, setBusqueda] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState('todas');

    useEffect(() => {
        document.title = 'BiblioUTP - Catálogo de Libros';
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

            <ListaLibros libros={librosFiltrados} />
        </div>
    );
}
