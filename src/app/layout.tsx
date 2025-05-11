import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f7f6f3] text-[#111] font-mono">
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Honey Provisions</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/builder">Start a Profile</Link>
          </nav>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}