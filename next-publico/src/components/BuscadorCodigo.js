'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuscadorCodigo() {
    const [codigo, setCodigo] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const limpio = codigo.trim().toUpperCase();
        if (!limpio) return;
        router.push(`/prestamo/${encodeURIComponent(limpio)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="buscador">
            <input
                type="text"
                placeholder="Consultar código (ej. PRE-0001)"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>
    );
}