import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carroService } from '../services/api';
import { Alerta, Loading } from '../components/Componentes';
import { ArrowLeft, Edit, Trash2, DollarSign } from 'lucide-react';

export default function DetalhesCarro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carro, setCarro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [deletando, setDeletando] = useState(false);

    useEffect(() => {
        carregarDetalhesCarro();
    }, [id]);

    const carregarDetalhesCarro = async () => {
        try {
            setCarregando(true);
            setErro(null);
            const dados = await carroService.obterCarro(id);
            setCarro(dados);
        } catch (err) {
            setErro(err.message || 'Erro ao carregar detalhes do carro');
        } finally {
            setCarregando(false);
        }
    };

    const handleDeletar = async () => {
        if (window.confirm('Tem certeza que deseja deletar este carro?')) {
            try {
                setDeletando(true);
                await carroService.deletarCarro(id);
                navigate('/', { replace: true });
            } catch (err) {
                setErro(err.message || 'Erro ao deletar carro');
                setDeletando(false);
            }
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <Loading mensagem="Carregando detalhes do carro..." />
            </div>
        );
    }

    if (!carro) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </Link>
                    <div className="mt-8 p-6 bg-white rounded-lg shadow text-center">
                        <p className="text-gray-600">Carro não encontrado</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </Link>
                </div>

                {erro && (
                    <Alerta tipo="erro" mensagem={erro} onFechar={() => setErro(null)} />
                )}

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header com gradiente */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                        <h1 className="text-4xl font-bold">
                            {carro.marca} <span className="text-blue-100">{carro.modelo}</span>
                        </h1>
                        <p className="text-blue-100 mt-2 text-lg">Ano: <span className="font-semibold">{carro.ano}</span></p>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Coluna esquerda - Informações */}
                            <div className="space-y-6">
                                {/* Preço destaque */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold uppercase mb-2">
                                        <DollarSign className="w-4 h-4" />
                                        Preço
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">
                                        R$ {parseFloat(carro.preco).toFixed(2).replace('.', ',')}
                                    </p>
                                </div>

                                {/* Informações gerais */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Gerais</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-600 font-medium">Marca:</span>
                                            <span className="font-semibold text-gray-900">{carro.marca}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-600 font-medium">Modelo:</span>
                                            <span className="font-semibold text-gray-900">{carro.modelo}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-600 font-medium">Ano:</span>
                                            <span className="font-semibold text-gray-900 bg-blue-50 px-3 py-1 rounded">{carro.ano}</span>
                                        </div>
                                        {carro.cor && (
                                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium">Cor:</span>
                                                <span className="font-semibold text-gray-900">{carro.cor}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
                                <textarea
                                    className="w-full h-[330px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Descreva o carro..."
                                    value={carro.descricao}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 flex-wrap">
                            <button
                                onClick={handleDeletar}
                                disabled={deletando}
                                className="flex items-center justify-center gap-2 flex-1 min-w-[150px] bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
                            >
                                <Trash2 className="w-5 h-5" />
                                {deletando ? 'Deletando...' : 'Deletar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
