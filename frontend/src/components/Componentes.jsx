import { AlertCircle, CheckCircle, AlertTriangle, Info, Loader2, ChevronLeft, ChevronRight, Trash2, Edit, Eye } from 'lucide-react';

// Componente de Alerta Reutilizável
export function Alerta({ tipo = 'erro', mensagem, onFechar }) {
    const estilos = {
        erro: {
            container: 'bg-red-50 border-red-200 border-l-4 border-l-red-500',
            icon: 'text-red-500',
            texto: 'text-red-800',
        },
        sucesso: {
            container: 'bg-green-50 border-green-200 border-l-4 border-l-green-500',
            icon: 'text-green-500',
            texto: 'text-green-800',
        },
        aviso: {
            container: 'bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500',
            icon: 'text-yellow-500',
            texto: 'text-yellow-800',
        },
        info: {
            container: 'bg-blue-50 border-blue-200 border-l-4 border-l-blue-500',
            icon: 'text-blue-500',
            texto: 'text-blue-800',
        },
    };

    const iconeMap = {
        erro: AlertCircle,
        sucesso: CheckCircle,
        aviso: AlertTriangle,
        info: Info,
    };

    const estilo = estilos[tipo];
    const IconComponent = iconeMap[tipo];

    return (
        <div className={`p-4 mb-4 rounded-lg ${estilo.container}`}>
            <div className="flex items-start gap-3">
                <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${estilo.icon}`} />
                <div className="flex-1">
                    <p className={`${estilo.texto} font-medium`}>{mensagem}</p>
                </div>
                {onFechar && (
                    <button
                        onClick={onFechar}
                        className={`text-lg hover:opacity-70 transition flex-shrink-0 ${estilo.texto}`}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}


export function Loading({ mensagem = 'Carregando...' }) {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-3" />
            <span className="text-gray-600 font-medium">{mensagem}</span>
        </div>
    );
}

// Componente de Paginação
export function Paginacao({ paginaAtual, totalPaginas, onAnterior, onProxima }) {
    return (
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button
                onClick={onAnterior}
                disabled={paginaAtual === 1}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition"
            >
                <ChevronLeft className="w-5 h-5" />
                Anterior
            </button>
            <span className="text-gray-700 font-medium">
                Página <span className="font-bold">{paginaAtual}</span> de <span className="font-bold">{totalPaginas}</span>
            </span>
            <button
                onClick={onProxima}
                disabled={paginaAtual >= totalPaginas}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition"
            >
                Próxima
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}

export function Botao({
    tipo = 'primario',
    tamanho = 'md',
    desabilitado = false,
    icone: Icone = null,
    className = '',
    ...props
}) {
    const tipos = {
        primario: 'bg-blue-600 hover:bg-blue-700 text-white',
        secundario: 'bg-gray-600 hover:bg-gray-700 text-white',
        sucesso: 'bg-green-600 hover:bg-green-700 text-white',
        aviso: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        perigo: 'bg-red-600 hover:bg-red-700 text-white',
        outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    };

    const tamanhos = {
        sm: 'py-1 px-3 text-sm gap-1',
        md: 'py-2 px-4 text-base gap-2',
        lg: 'py-3 px-6 text-lg gap-2',
    };

    return (
        <button
            disabled={desabilitado}
            className={`
                font-bold rounded-lg transition flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed
                ${tipos[tipo]} ${tamanhos[tamanho]} ${className}
            `}
            {...props}
        >
            {Icone && <Icone className="w-5 h-5" />}
            {props.children}
        </button>
    );
}

// Componente de Botões de Ação
export function BotoesAcao({ onEditar, onVerDetalhes, onDeletar, carregando = false }) {
    return (
        <div className="flex gap-2">
            {onVerDetalhes && (
                <button
                    onClick={onVerDetalhes}
                    disabled={carregando}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                    title="Ver detalhes"
                >
                    <Eye className="w-5 h-5" />
                </button>
            )}
            {onEditar && (
                <button
                    onClick={onEditar}
                    disabled={carregando}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition disabled:opacity-50"
                    title="Editar"
                >
                    <Edit className="w-5 h-5" />
                </button>
            )}
            {onDeletar && (
                <button
                    onClick={onDeletar}
                    disabled={carregando}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Deletar"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}


// Componente de Input Customizado

