// app/layout.tsx
import Link from 'next/link';
import './globals.css';
import Providers from './providers';
import { AuthProvider } from './context/AuthContext';
import AuthButton from '../components/AuthButton';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <header className="site-header">
              <div className="site-logo-wrapper">
                <Link href="/">
                  <img src="/logo.png" alt="Site Logo" className="site-logo" />
                </Link>
              </div>
              <AuthButton />
            </header>

            <nav className="site-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link href="/shared-plans">공유계획</Link>
                </li>
                <li className="nav-item">
                  <Link href="/personal-plans">개인계획</Link>
                </li>
                <li className="nav-item">
                  <Link href="/transport-info">교통편 정보</Link>
                </li>
              </ul>
            </nav>

            <main>{children}</main>
            <footer className="site-footer">
              <p>© 2024 My Next.js Site</p>
            </footer>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
