import Link from 'next/link';
import BuscadorCodigo from '../components/BuscadorCodigo';
import './globals.css';

export const metadata = {
  title: 'BiblioUTP · Portal Público SSR',
  description: 'Consulta pública del catálogo de libros y estado de préstamos de BiblioUTP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <Link href="/libros" className="brand">
              <span className="badge-utp">UTP</span>
              <span>BiblioUTP · Portal Público</span>
            </Link>
            <BuscadorCodigo />
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          BiblioUTP © 2026 · Renderizado en el Servidor (Next.js SSR)
        </footer>
      </body>
    </html>
  );
}