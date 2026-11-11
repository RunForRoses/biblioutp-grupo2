import { createContext, useContext, useState, useEffect } from 'react';
import { USUARIOS_INICIALES } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Inicializar sesion desde localStorage
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem('biblio_usuario');
        return guardado ? JSON.parse(guardado) : null;
    });

    // Sincronizar cambios de sesion con localStorage
    useEffect(() => {
        if (usuario) {
            localStorage.setItem('biblio_usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('biblio_usuario');
        }
    }, [usuario]);

    // Método de Login con validacion de roles
    const login = (codigoOCorreo, password) => {
        const encontrado = USUARIOS_INICIALES.find(
            (u) => (u.correo.toLowerCase() === codigoOCorreo.toLowerCase() ||
                u.codigo.toLowerCase() === codigoOCorreo.toLowerCase()) &&
                u.password === password
        );

        if (!encontrado) {
            return { exito: false, mensaje: 'Credenciales incorrectas. Verifica correo/código y contraseña.' };
        }

        // Si es admin se le avisa que su panel está en Angular
        if (encontrado.rol !== 'estudiante') {
            return {
                exito: false,
                esAdmin: true,
                mensaje: 'Esta cuenta es de Administrador. Debes ingresar al panel administrativo en Angular (puerto 4200).'
            };
        }

        setUsuario(encontrado);
        return { exito: true, usuario: encontrado };
    };

    // Método de Logout
    const logout = () => {
        setUsuario(null);
    };

    const valor = {
        usuario,
        estaAutenticado: Boolean(usuario),
        login,
        logout
    };

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para consumirlo fácilmente
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
}