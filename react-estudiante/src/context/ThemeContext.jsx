import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    // Recuperar tema guardado o iniciar en light
    const [tema, setTema] = useState(() => {
        return localStorage.getItem('biblio_tema') || 'light';
    });

    useEffect(() => {
        //El modo oscuro
        document.documentElement.setAttribute('data-bs-theme', tema);
        localStorage.setItem('biblio_tema', tema);
    }, [tema]);

    const toggleTema = () => {
        setTema((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ tema, toggleTema, esOscuro: tema === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook personalizado
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
    }
    return context;
}