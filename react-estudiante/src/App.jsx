import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import { DetalleLibro } from './pages/DetalleLibro.jsx';
import { MisReservas } from './pages/MisReservas.jsx';
import { NuevaReserva } from './pages/NuevaReserva.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './App.css';

function RutaProtegida({ children }) {
    const { estaAutenticado } = useAuth();
    if (!estaAutenticado) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <main className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="/catalogo" replace />} />
                        <Route path="/catalogo" element={<Catalogo />} />
                        <Route path="/catalogo/:id" element={<DetalleLibro />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mis-reservas" element={<RutaProtegida><MisReservas /></RutaProtegida>} />
                        <Route path="/nueva-reserva" element={<RutaProtegida><NuevaReserva /></RutaProtegida>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <footer className="py-3 text-center border-top text-muted small mt-auto">
                    BiblioUTP © 2026 – Sistema Bibliotecario Universitario
                </footer>
            </div>
        </BrowserRouter>
    );
}