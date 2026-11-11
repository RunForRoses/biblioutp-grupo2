import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
    const { login, estaAutenticado } = useAuth();
    const navigate = useNavigate();

    const [identificador, setIdentificador] = useState('u20231234@utp.edu.pe');
    const [password, setPassword] = useState('est123');
    const [error, setError] = useState(null);
    const [avisoAdmin, setAvisoAdmin] = useState(false);

    useEffect(() => {
        document.title = 'BiblioUTP - Iniciar Sesión';
        if (estaAutenticado) {
            navigate('/catalogo');
        }
    }, [estaAutenticado, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setAvisoAdmin(false);

        const res = login(identificador, password);
        if (res.exito) {
            navigate('/catalogo');
        } else {
            setError(res.mensaje);
            if (res.esAdmin) {
                setAvisoAdmin(true);
            }
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: '480px' }}>
            <div className="card shadow-sm border-0 p-4">
                <div className="text-center mb-4">
                    <span className="badge bg-danger fs-6 px-3 py-2 mb-2">UTP</span>
                    <h2 className="h4 fw-bold">Portal del Estudiante</h2>
                    <p className="text-muted small">Ingresa con tu correo institucional o código de alumno</p>
                </div>

                {error && (
                    <div className={`alert ${avisoAdmin ? 'alert-warning' : 'alert-danger'}`} role="alert">
                        <p className="mb-0 small">{error}</p>
                        {avisoAdmin && (
                            <a href="http://localhost:4200" className="btn btn-sm btn-warning mt-2 w-100 fw-bold">
                                Ir al Portal Admin en Angular (:4200) →
                            </a>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Correo o Código</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="u20231234@utp.edu.pe o U20231234"
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="form-text small">Demo estudiante: pass <code>est123</code></div>
                    </div>
                    <button type="submit" className="btn btn-danger w-100 py-2 fw-bold">
                        Ingresar a BiblioUTP
                    </button>
                </form>
            </div>
        </div>
    );
}