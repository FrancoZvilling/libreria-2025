// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import { allBooks } from './data/books';
import './App.css';

// Componente para manejar la lógica de query params
function AppContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Actualizar filtros basados en URL al cargar y al cambiar URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const querySearch = params.get('search');
        const queryGenre = params.get('genre');

        if (querySearch) setSearchTerm(querySearch);
        else setSearchTerm(''); // Limpiar si no hay query

        if (queryGenre) setSelectedGenre(queryGenre);
        else setSelectedGenre(null); // Limpiar si no hay query

    }, [location.search]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        const params = new URLSearchParams(location.search);
        if (term) params.set('search', term);
        else params.delete('search');
        navigate(`/?${params.toString()}`);
    };

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre);
        const params = new URLSearchParams(location.search);
        if (genre) params.set('genre', genre);
        else params.delete('genre');
        navigate(`/?${params.toString()}`);
    };
    
    return (
        <>
            <Navbar
                onSearch={handleSearch}
                onSelectGenre={handleSelectGenre}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            books={allBooks}
                            currentGenre={selectedGenre}
                            searchTerm={searchTerm}
                        />
                    }
                />
                <Route path="/book/:bookId" element={<BookDetailPage />} />
                {/* Aquí podrías añadir más rutas, como /checkout, /profile, etc. */}
            </Routes>
            <Footer />
        </>
    );
}


function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <Router>
                    <AppContent />
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
