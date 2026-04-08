export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Sobre */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">GestaoCar</h3>
                        <p className="text-gray-400">
                            Sistema completo de gestão de carros com funcionalidades de cadastro, edição e visualização de detalhes.
                        </p>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li><a href="/" className="hover:text-white transition">Início</a></li>
                            <li><a href="/" className="hover:text-white transition">Lista de Carros</a></li>
                            <li><a href="/cadastro" className="hover:text-white transition">Cadastrar Carro</a></li>
                        </ul>
                    </div>

                    {/* Informações */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Informações</h3>
                        <p className="text-gray-400">
                            <strong>Versão:</strong> 1.0.0<br />
                            <strong>Desenvolvido com:</strong> React + Vite + Tailwind CSS
                        </p>
                    </div>
                </div>

                {/* Divisor */}
                <hr className="border-gray-700 mb-8" />

                {/* Copyright e créditos */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>
                        &copy; {year} Sistema de Gestão de Carros. Todos os direitos reservados.
                    </p>
                    <p>
                        Desenvolvido por: <strong>Matheus Antonio Bernardi</strong> 
                    </p>
                </div>
            </div>
        </footer>
    );
}
