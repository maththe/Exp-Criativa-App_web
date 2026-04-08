import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { carroService } from '../services/api';
import { Alerta, Loading, Botao } from '../components/Componentes';
import { ArrowLeft, Save } from 'lucide-react';

export default function FormCarro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdicao = !!id;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            ano: new Date().getFullYear(),
            preco: '',
            marca: '',
            modelo: '',
            cor: '',
            descricao: ''
        }
    });

    const [carregando, setCarregando] = useState(isEdicao);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(false);

    useEffect(() => {
        if (isEdicao) {
            carregarCarro();
        }
    }, [id, isEdicao]);

    const carregarCarro = async () => {
        try {
            setCarregando(true);
            setErro(null);
            const carro = await carroService.obterCarro(id);

            // Preenche o formulário com os dados da API
            Object.keys(carro).forEach((key) => {
                setValue(key, carro[key]);
            });
        } catch (err) {
            setErro(err.message || 'Erro ao carregar carro');
        } finally {
            setCarregando(false);
        }
    };

    // O React Hook Form passa os dados validados para esta função
    const onSubmit = async (dados) => {
        console.log(dados);
        setErro(null);
        setSucesso(false);
        try {
            if (isEdicao) {
                await carroService.atualizarCarro(id, dados);
            } else {
                await carroService.criarCarro(dados);
            }
            setSucesso(true);
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setErro(err.message || 'Erro ao salvar carro');
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <Loading mensagem="Carregando formulário..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">
                        {isEdicao ? 'Editar Carro' : 'Cadastro de Novo Carro'}
                    </h1>
                </div>

                {erro && (
                    <Alerta tipo="erro" mensagem={erro} onFechar={() => setErro(null)} />
                )}

                {sucesso && (
                    <Alerta tipo="sucesso" mensagem={`Carro ${isEdicao ? 'atualizado' : 'cadastrado'} com sucesso!`} />
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                        <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
                            Marca <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="marca"
                            placeholder="ex: Toyota, Ford, BMW"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.marca ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('marca', { required: 'Marca é obrigatória' })}
                        />
                        {errors.marca && <p className="text-red-500 text-sm mt-1">{errors.marca.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-2">
                            Modelo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="modelo"
                            placeholder="ex: Corolla, Civic, X1"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.modelo ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('modelo', { required: 'Modelo é obrigatório' })}
                        />
                        {errors.modelo && <p className="text-red-500 text-sm mt-1">{errors.modelo.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-2">
                                Ano <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="ano"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.ano ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('ano', {
                                    required: 'Ano é obrigatório',
                                    valueAsNumber: true,
                                    min: { value: 1900, message: 'Ano inválido' },
                                    max: { value: new Date().getFullYear() + 1, message: 'Ano inválido' }
                                })}
                            />
                            {errors.ano && <p className="text-red-500 text-sm mt-1">{errors.ano.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
                                Preço (R$) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="preco"
                                placeholder="0.00"
                                step="0.01"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.preco ? 'border-red-500' : 'border-gray-300'}`}
                                {...register('preco', {
                                    required: 'Preço é obrigatório',
                                    valueAsNumber: true,
                                    min: { value: 0.01, message: 'Preço deve ser maior que zero' }
                                })}
                            />
                            {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cor" className="block text-sm font-medium text-gray-700 mb-2">
                            Cor
                        </label>
                        <input
                            type="text"
                            id="cor"
                            placeholder="ex: Preto, Branco, Prata"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            {...register('cor')}
                        />
                    </div>

                    <div>
                        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            placeholder="Detalhes adicionais sobre o carro..."
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                            {...register('descricao')}
                        />
                    </div>

                    <div className="flex gap-4 pt-6 border-t">
                        <Botao
                            tipo="primario"
                            tamanho="lg"
                            desabilitado={isSubmitting}
                            icone={Save}
                            className="flex-1"
                        >
                            {isSubmitting ? 'Salvando...' : isEdicao ? 'Atualizar' : 'Cadastrar'}
                        </Botao>
                        <Link
                            to="/"
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg text-center transition flex items-center justify-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}