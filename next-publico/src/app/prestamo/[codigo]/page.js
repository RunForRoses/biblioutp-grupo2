import Link from 'next/link';
import { notFound } from 'next/navigation';

async function obtenerPrestamoPorCodigo(codigo) {
    try {
        const res = await fetch(
            `http://localhost:3000/prestamos?codigo=${encodeURIComponent(codigo.toUpperCase())}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        const lista = await res.json();
        return lista[0] || null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { codigo } = await params;
    return {
        title: `Estado del Préstamo ${codigo.toUpperCase()} | BiblioUTP`,
        description: `Consulta pública del estado de solicitud para el código ${codigo.toUpperCase()}.`,
    };
}

export default async function ConsultaPrestamoPage({ params }) {
    const { codigo } = await params;
    const prestamo = await obtenerPrestamoPorCodigo(codigo);

    if (!prestamo) notFound();

    return (
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link href="/libros" className="btn btn-outline" style={{ width: 'fit-content' }}>
                ← Volver al catálogo
            </Link>

            <article className="card">
                <span className={`pill pill-${prestamo.estado}`}>{prestamo.estado.toUpperCase()}</span>
                <h1>Préstamo {prestamo.codigo}</h1>
                <p><strong>Libro:</strong> {prestamo.libro || `Libro #${prestamo.libroId}`}</p>
                <p><strong>Fecha:</strong> {prestamo.fecha}</p>
                <p><strong>Horario:</strong> {prestamo.horaInicio} - {prestamo.horaFin}</p>
                <p><strong>Motivo:</strong> {prestamo.motivo}</p>
            </article>
        </div>
    );
}