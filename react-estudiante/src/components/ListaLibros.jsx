import { TarjetaLibro } from './TarjetaLibro';

export function ListaLibros({ libros = [] }) {
    if (libros.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted fs-5">No se encontraron libros que coincidan con la búsqueda</p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {libros.map((libro) => (
                <div key={libro.id} className="col-12 col-md-6 col-lg-4">
                    <TarjetaLibro libro={libro} />
                </div>
            ))}
        </div>
    );
}