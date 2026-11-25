import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:3000';

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('biblio_usuario');
        return guardado ? JSON.parse(guardado) : null;
    });

    useEffect(() => {
        if (usuario) {
            localStorage.setItem('biblio_usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('biblio_usuario');
        }
    }, [usuario]);

    const login = async (codigoOCorreo, password) => {
        const valor = codigoOCorreo.trim();
        const parametro = valor.includes('@')
            ? `correo=${encodeURIComponent(valor.toLowerCase())}`
            : `codigo=${encodeURIComponent(valor.toUpperCase())}`;

        try {
            const response = await fetch(`${API_URL}/usuarios?${parametro}`);
            if (!response.ok) {
                return { exito: false, mensaje: 'No se pudo conectar con el servidor de usuarios.' };
            }

            const usuarios = await response.json();
            const encontrado = usuarios.find((u) => u.password === password);

            if (!encontrado) {
                return { exito: false, mensaje: 'Credenciales incorrectas. Verifica correo/código y contraseña.' };
            }

            if (encontrado.rol !== 'estudiante') {
                return {
                    exito: false,
                    esAdmin: true,
                    mensaje: 'Esta cuenta es de Administrador. Debes ingresar al panel administrativo en Angular (puerto 4200).'
                };
            }

            setUsuario(encontrado);
            return { exito: true, usuario: encontrado };
        } catch {
            return { exito: false, mensaje: 'Error de conexión. Verifica que api-mock esté corriendo en el puerto 3000.' };
        }
    };

    const logout = () => setUsuario(null);

    return (
        <AuthContext.Provider value={{ usuario, estaAutenticado: Boolean(usuario), login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
}