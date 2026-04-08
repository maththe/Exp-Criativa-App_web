import { Link, useLocation } from 'react-router-dom';
import { Car, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) => `
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
        ${isActive(path)
            ? 'bg-blue-500 text-white'
            : 'text-gray-100 hover:bg-blue-700'
        }
    `;

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <Car className="w-8 h-8 group-hover:scale-110 transition" />
                        <span className="text-2xl font-bold group-hover:text-blue-100 transition">
                            GestaoCar
                        </span>
                    </Link>
                    <div>Matheus Antonio Benardi</div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        <Link to="/" className={linkClass('/')}>
                            Lista de Carros
                        </Link>
                        <Link to="/cadastro" className={linkClass('/cadastro')}>
                            <Plus className="w-5 h-5" />
                            Novo Carro
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-blue-700 rounded-lg transition"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden pb-4 border-t border-blue-500 mt-2 flex flex-col gap-2">
                        <Link
                            to="/"
                            className={linkClass('/')}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Lista de Carros
                        </Link>
                        <Link
                            to="/cadastro"
                            className={linkClass('/cadastro')}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Plus className="w-5 h-5" />
                            Novo Carro
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
