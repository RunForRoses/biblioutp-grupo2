import Link from 'next/link';
import { notFound } from 'next/navigation';

async function obtenerLibroYPrestamos(id) {
    try {
        const [resLibro, resPrestamos] = await Promise.all([
            fetch(`http://localhost:3000/libros/${id}`, { cache: 'no-store' }),
            fetch(`http://localhost:3000/prestamos?libroId=${id}&estado=aprobada`, { cache: 'no-store' }),
        ]);
        if (!resLibro.ok) return null;
        const libro = await resLibro.json();
        const prestamos = resPrestamos.ok ? await resPrestamos.json() : [];
        return { libro, prestamos };
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const datos = await obtenerLibroYPrestamos(id);
    if (!datos) {
        return { title: 'Libro no encontrado | BiblioUTP' };
    }
    return {
        title: `${datos.libro.nombre} | BiblioUTP`,
        description: `Disponibilidad en sede ${datos.libro.sede}. Ejemplares: ${datos.libro.capacidad}.`,
    };
}

export default async function DetalleLibroSSRPage({ params }) {
    const { id } = await params;
    const datos = await obtenerLibroYPrestamos(id);

    if (!datos) notFound();

    const { libro, prestamos } = datos;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Link href="/libros" className="btn btn-outline" style={{ width: 'fit-content' }}>
                ← Volver al catálogo
            </Link>

            <article className="card">
                <span className={`pill pill-${libro.estado}`}>{libro.estado.toUpperCase()}</span>
                <h1>{libro.nombre}</h1>
                <p style={{ color: '#475569' }}>
                    <strong>Sede:</strong> {libro.sede} · <strong>Ejemplares disponibles:</strong> {libro.capacidad}
                </p>
                <p style={{ color: '#475569' }}>
                    <strong>Formatos:</strong> {libro.formatos?.join(', ')}
                </p>
            </article>

            <section className="card">
                <h2>Préstamos aprobados registrados ({prestamos.length})</h2>
                {prestamos.length === 0 ? (
                    <p style={{ color: '#64748b' }}>Este libro no tiene préstamos aprobados activos actualmente.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {prestamos.map((p) => (
                            <div key={p.id} style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8 }}>
                                <strong>{p.codigo}</strong> · Fecha: {p.fecha} · Horario: {p.horaInicio} - {p.horaFin}
                                <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Motivo: {p.motivo}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}