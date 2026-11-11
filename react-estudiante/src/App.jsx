import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import { DetalleLibro } from './pages/DetalleLibro.jsx';
import { MisReservas } from './pages/MisReservas.jsx';
import { NuevaReserva } from './pages/NuevaReserva.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { LIBROS_INICIALES, PRESTAMOS_INICIALES } from './data/mockData.js';
import './App.css';

// Componente para proteger las rutas privadas
function RutaProtegida({ children }) {
    const { estaAutenticado } = useAuth();
    if (!estaAutenticado) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default function App() {
    const [libros, setLibros] = useState(LIBROS_INICIALES);
    const [prestamos, setPrestamos] = useState(PRESTAMOS_INICIALES);

    const handleAgregarPrestamo = (nuevoPrestamo) => {
        setPrestamos((prev) => [nuevoPrestamo, ...prev]);

        // Disminuirye el stock fisico si el prestamo es de formato fisico
        if (nuevoPrestamo.formato === 'Físico') {
            setLibros((prev) =>
                prev.map((l) => {
                    if (l.id === Number(nuevoPrestamo.libroId) && l.capacidad > 0) {
                        const nuevaCapacidad = l.capacidad - 1;
                        return {
                            ...l,
                            capacidad: nuevaCapacidad,
                            estado: nuevaCapacidad === 0 ? 'agotado' : l.estado
                        };
                    }
                    return l;
                })
            );
        }
    };

    const handleCancelarPrestamo = (prestamoId) => {
        setPrestamos((prev) => prev.filter((p) => p.id !== prestamoId));
    };

    return (
        <BrowserRouter>
            <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <main className="flex-fill">
                    <Routes>
                        {/* RUTEO*/}
                        {/* Redireccion al catalogo */}
                        <Route path="/" element={<Navigate to="/catalogo" replace />} />

                        {/* Catalogo General */}
                        <Route path="/catalogo" element={<Catalogo libros={libros} />} />

                        {/* Detalle de Libro */}
                        <Route path="/catalogo/:id" element={<DetalleLibro libros={libros} />} />

                        {/* Login del Estudiante */}
                        <Route path="/login" element={<Login />} />

                        {/* Mis Prestamos */}
                        <Route
                            path="/mis-reservas"
                            element={
                                <RutaProtegida>
                                    <MisReservas
                                        prestamos={prestamos}
                                        onCancelarPrestamo={handleCancelarPrestamo}
                                    />
                                </RutaProtegida>
                            }
                        />

                        {/* Nuevo Prestamo */}
                        <Route
                            path="/nueva-reserva"
                            element={
                                <RutaProtegida>
                                    <NuevaReserva
                                        libros={libros}
                                        prestamos={prestamos}
                                        onAgregarPrestamo={handleAgregarPrestamo}
                                    />
                                </RutaProtegida>
                            }
                        />

                        {/* Pagina 404 No Encontrado */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <footer className="py-3 text-center border-top text-muted small mt-auto">
                    BiblioUTP © 2026 - Sistema Bibliotecario Universitario
                </footer>
            </div>
        </BrowserRouter>
    );
}
