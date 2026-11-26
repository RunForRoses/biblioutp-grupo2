import Link from 'next/link';

export const metadata = {
    title: 'Catálogo Público de Libros | BiblioUTP',
    description: 'Consulta pública en tiempo real de todos los libros disponibles en las sedes de BiblioUTP.',
};

async function obtenerLibrosSSR() {
    try {
        const res = await fetch('http://localhost:3000/libros', { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default async function CatalogoPublicoPage() {
    const libros = await obtenerLibrosSSR();

    if (!libros) {
        return (
            <div className="card">
                <h2>No se pudo conectar con el servidor</h2>
                <p>Verifica que <code>api-mock</code> esté corriendo en el puerto 3000.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Catálogo Público de Libros</h1>
            <p style={{ color: '#475569', marginTop: 6 }}>
                Página renderizada en el servidor (SSR). Total de ejemplares: <strong>{libros.length}</strong>.
            </p>

            <div className="grid">
                {libros.map((libro) => (
                    <article key={libro.id} className="card">
                        <span className={`pill pill-${libro.estado}`}>{libro.estado.toUpperCase()}</span>
                        <h2 style={{ fontSize: 18 }}>{libro.nombre}</h2>
                        <p style={{ fontSize: 14, color: '#475569' }}>
                            <strong>Sede:</strong> {libro.sede} · <strong>Stock:</strong> {libro.capacidad}
                        </p>
                        <p style={{ fontSize: 13, color: '#64748b' }}>
                            Formatos: {libro.formatos?.join(', ')}
                        </p>
                        <Link href={`/libros/${libro.id}`} className="btn" style={{ marginTop: 'auto' }}>
                            Ver detalle y horarios
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}