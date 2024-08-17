// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Next.js Site</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 My Next.js Site</p>
        </footer>
      </body>
    </html>
  );
}
