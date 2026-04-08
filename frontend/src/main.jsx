import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaCarros from './pages/ListaCarros';
import FormCarro from './pages/FormCarro';
import DetalhesCarro from './pages/DetalhesCarro';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<ListaCarros />} />
                        <Route path="/cadastro" element={<FormCarro />} />
                        <Route path="/editar/:id" element={<FormCarro />} />
                        <Route path="/detalhes/:id" element={<DetalhesCarro />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
