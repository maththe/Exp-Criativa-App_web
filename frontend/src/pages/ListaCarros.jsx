import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { carroService } from '../services/api';
import { Alerta, Loading, Paginacao, BotoesAcao } from '../components/Componentes';


export default function ListaCarros() {
    const [carros, setCarros] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [mensagem, setMensagem] = useState(null);
    const [limite, setLimite] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        carregarCarros();
    }, [paginaAtual, limite]);

    const carregarCarros = async () => {
        try {
            setCarregando(true);
            setErro(null);
            const dados = await carroService.listarCarros(paginaAtual, limite);
            setCarros(dados.carros || []);
            setTotalPaginas(dados.totalPaginas || 1);
        } catch (err) {
            setErro(err.message || 'Erro ao carregar carros');
            setCarros([]);
        } finally {
            setCarregando(false);
        }
    };

    const handleDeletar = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este carro?')) {
            try {
                await carroService.deletarCarro(id);
                setMensagem('Carro deletado com sucesso!');
                setTimeout(() => {
                    setMensagem(null);
                    carregarCarros();
                }, 2000);
            } catch (err) {
                setErro(err.message || 'Erro ao deletar carro');
            }
        }
    };

    const handleAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const handleProxima = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Listagem de Carros</h1>
                </div>

                {mensagem && (
                    <Alerta tipo="sucesso" mensagem={mensagem} onFechar={() => setMensagem(null)} />
                )}

                {erro && (
                    <Alerta tipo="erro" mensagem={erro} onFechar={() => setErro(null)} />
                )}

                <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                    <label htmlFor="limite" className="text-gray-700 font-semibold">
                        Carros por página:
                    </label>
                    <select
                        id="limite"
                        value={limite}
                        onChange={(e) => {
                            setLimite(parseInt(e.target.value));
                            setPaginaAtual(1);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="bg-white rounded-lg shadow">
                    {carregando ? (
                        <Loading mensagem="Carregando carros..." />
                    ) : carros.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 mb-4">Nenhum carro encontrado.</p>
                            <Link to="/cadastro" className="text-blue-600 hover:underline font-medium">
                                Cadastre o primeiro!
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Marca</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Modelo</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ano</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Preço</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carros.map((carro) => (
                                            <tr key={carro.id} className="border-b hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{carro.marca}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{carro.modelo}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{carro.ano}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                                                    R$ {parseFloat(carro.preco).toFixed(2).replace('.', ',')}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <BotoesAcao
                                                        onVerDetalhes={() => navigate(`/detalhes/${carro.id}`)}
                                                        onEditar={() => navigate(`/editar/${carro.id}`)}
                                                        onDeletar={() => handleDeletar(carro.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Paginacao
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                onAnterior={handleAnterior}
                                onProxima={handleProxima}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
