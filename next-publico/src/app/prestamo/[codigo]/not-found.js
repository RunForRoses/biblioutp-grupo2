import Link from 'next/link';

export default function PrestamoNoEncontrado() {
    return (
        <div className="card" style={{ maxWidth: 520, margin: '20px auto', textAlign: 'center' }}>
            <h1>Préstamo no encontrado</h1>
            <p style={{ color: '#475569' }}>
                No existe ninguna solicitud registrada con ese código. Verifica que esté bien escrito (ej. <code>PRE-0001</code>).
            </p>
            <Link href="/libros" className="btn" style={{ marginTop: 10 }}>
                Volver al catálogo público
            </Link>
        </div>
    );
}