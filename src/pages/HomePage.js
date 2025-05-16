// src/pages/HomePage.js
import React from 'react';
import BookCarousel from '../components/BookCarousel';

const HomePage = ({ books, currentGenre, searchTerm }) => {
    let filteredBooks = books;

    if (currentGenre) {
        filteredBooks = filteredBooks.filter(book => book.genre === currentGenre);
    }

    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(lowerSearchTerm) ||
            book.author.toLowerCase().includes(lowerSearchTerm)
        );
    }
    
    const carouselTitle = currentGenre 
        ? `Libros de ${currentGenre}` 
        : searchTerm 
        ? `Resultados para "${searchTerm}"`
        : "Descubre Nuevas Lecturas";

    return (
        <main>
            <BookCarousel books={filteredBooks} title={carouselTitle} />
            {/* Podrías añadir más secciones aquí, como "Más Populares", "Novedades", etc. */}
        </main>
    );
};

export default HomePage;