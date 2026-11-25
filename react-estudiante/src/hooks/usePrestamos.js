import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../services/axiosClient.js';

export function usePrestamos(usuarioId) {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargar = useCallback(async (silencioso = false) => {
        if (!usuarioId) {
            setDatos([]);
            setCargando(false);
            return;
        }
        if (!silencioso) setCargando(true);
        setError(null);
        try {
            const res = await axiosClient.get(`/prestamos?usuarioId=${usuarioId}`);
            setDatos(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }, [usuarioId]);

    useEffect(() => {
        if (!usuarioId) return;
        axiosClient.get(`/prestamos?usuarioId=${usuarioId}`)
            .then((res) => {
                setDatos(res.data);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));

        const intervalo = setInterval(() => cargar(true), 15000);
        return () => clearInterval(intervalo);
    }, [usuarioId, cargar]);

    const crear = async (nuevoPrestamo) => {
        setError(null);
        const res = await axiosClient.post('/prestamos', nuevoPrestamo);
        setDatos((prev) => [res.data, ...prev]);
        return res.data;
    };

    const cancelar = async (id) => {
        setError(null);
        await axiosClient.delete(`/prestamos/${id}`);
        setDatos((prev) => prev.filter((p) => p.id !== id));
    };

    return { datos, cargando, error, crear, cancelar, recargar: () => cargar(false) };
}