export function BadgeEstado({ estado }) {
    const mapaEstilos = {
        disponible: 'bg-success',
        agotado: 'bg-secondary',
        aprobada: 'bg-success',
        pendiente: 'bg-warning text-dark',
        rechazada: 'bg-danger'
    };

    const claseBadge = mapaEstilos[estado?.toLowerCase()] || 'bg-info text-dark';
    const texto = estado ? estado.charAt(0).toUpperCase() + estado.slice(1) : 'Desconocido';

    return (
        <span className={`badge ${claseBadge}`}>
            {texto}
        </span>
    );
}