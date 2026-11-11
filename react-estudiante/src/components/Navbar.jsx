import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
    const { usuario, estaAutenticado, logout } = useAuth();
    const { tema, toggleTema } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg border-bottom sticky-top ${
            tema === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
        }`}>
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
                    <span className="badge bg-danger">UTP</span>
                    <span>BiblioUTP</span>
                </Link>

                {/* Pestañas de navegacion */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/catalogo" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                                Catálogo
                            </NavLink>
                        </li>
                        {estaAutenticado && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/mis-reservas" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                                        Mis Préstamos
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/nueva-reserva" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                                        Nuevo Préstamo
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Modos de claridad e inicio de sesion */}
                    <div className="d-flex align-items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={toggleTema}
                            title="Cambiar tema claro/oscuro"
                        >
                            {tema === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
                        </button>

                        {estaAutenticado ? (
                            <div className="d-flex align-items-center gap-2">
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-none d-md-inline">
                                    {usuario.nombre} ({usuario.codigo})
                                </span>
                                <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-sm btn-danger">
                                Ingresar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}