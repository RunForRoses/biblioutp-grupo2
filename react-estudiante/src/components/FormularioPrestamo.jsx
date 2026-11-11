import { useState, useRef, useEffect } from 'react';
import { validarDatosPrestamo } from '../../../core-js/validadores.js';

export function FormularioPrestamo({ libroInicial, libros = [], prestamosExistentes = [], usuario, onGuardar }) {
    const primerCampoRef = useRef(null);
    const [form, setForm] = useState({
        libroId: libroInicial ? libroInicial.id : (libros[0]?.id || 1),
        correo: usuario?.correo || '',
        codigo: usuario?.codigo || '',
        formato: libroInicial?.formatos?.[0] || 'Físico',
        fecha: new Date().toISOString().split('T')[0],
        horaInicio: '08:00',
        horaFin: '10:00',
        motivo: ''
    });
    const [errores, setErrores] = useState([]);

    useEffect(() => {
        primerCampoRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'libroId' ? Number(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const prestamosActivos = prestamosExistentes.filter(
            p => p.usuarioId === usuario?.id && (p.estado === 'aprobada' || p.estado === 'pendiente')
        );
        if (prestamosActivos.length >= 3) {
            setErrores(['Has alcanzado el límite máximo de 3 préstamos activos simultáneos.']);
            primerCampoRef.current?.focus();
            return;
        }

        const resultado = validarDatosPrestamo(form, prestamosExistentes);
        if (!resultado.esValido) {
            setErrores(resultado.errores);
            primerCampoRef.current?.focus();
            return;
        }

        const libroSeleccionado = libros.find(l => l.id === Number(form.libroId)) || libroInicial;
        onGuardar({
            ...form,
            id: Date.now(),
            codigo: `PRE-${Math.floor(1000 + Math.random() * 9000)}`,
            usuarioId: usuario.id,
            nombreUsuario: usuario.nombre,
            libro: libroSeleccionado?.nombre || 'Libro BiblioUTP',
            estado: 'pendiente'
        });
        setErrores([]);
        primerCampoRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="card shadow-sm p-4 border-0">
            {errores.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    <ul className="mb-0 ps-3">
                        {errores.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </div>
            )}
            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Libro a solicitar</label>
                    <select ref={primerCampoRef} name="libroId" className="form-select" value={form.libroId} onChange={handleChange}>
                        {libros.map(l => (
                            <option key={l.id} value={l.id} disabled={l.estado === 'agotado'}>
                                {l.nombre} ({l.sede}) {l.estado === 'agotado' ? '- AGOTADO' : ''}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Formato</label>
                    <select name="formato" className="form-select" value={form.formato} onChange={handleChange}>
                        <option value="Físico">Físico (Préstamo en Sala / Domicilio)</option>
                        <option value="E-book">E-book (Digital)</option>
                        <option value="Audiolibro">Audiolibro</option>
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <label className="form-label fw-bold">Fecha de Préstamo</label>
                    <input type="date" name="fecha" className="form-control" value={form.fecha} onChange={handleChange} required />
                </div>
                <div className="col-6 col-md-4">
                    <label className="form-label fw-bold">Hora Inicio</label>
                    <input type="text" name="horaInicio" className="form-control" placeholder="08:00" value={form.horaInicio} onChange={handleChange} required />
                </div>
                <div className="col-6 col-md-4">
                    <label className="form-label fw-bold">Hora Fin</label>
                    <input type="text" name="horaFin" className="form-control" placeholder="10:00" value={form.horaFin} onChange={handleChange} required />
                </div>
                <div className="col-12">
                    <label className="form-label fw-bold">Motivo o Asignatura</label>
                    <input type="text" name="motivo" className="form-control" placeholder="Ej: Trabajo final de JavaScript Avanzado" value={form.motivo} onChange={handleChange} required />
                </div>
                <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-danger w-100 py-2 fw-bold">Confirmar Solicitud de Préstamo</button>
                </div>
            </div>
        </form>
    );
}
