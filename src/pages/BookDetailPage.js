// src/pages/BookDetailPage.js
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { allBooks as booksData } from '../data/books'; // Importa todos los libros
import { FaCartPlus, FaArrowLeft } from 'react-icons/fa';

const BookDetailPage = () => {
    const { bookId } = useParams();
    const { addToCart } = useContext(CartContext);
    const book = booksData.find(b => b.id === bookId);

    if (!book) {
        return (
            <div className="container book-detail-page">
                <h2>Libro no encontrado</h2>
                <Link to="/" className="button-primary"><FaArrowLeft /> Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="container book-detail-page">
            <Link to="/" className="button-secondary" style={{marginBottom: '20px', display: 'inline-flex', alignItems: 'center'}}>
                <FaArrowLeft style={{marginRight: '8px'}}/> Volver
            </Link>
            <div className="book-detail-container">
                <div className="book-detail-image">
                    <img src={book.imageUrl || '/book-covers/placeholder.jpg'} alt={book.title} />
                </div>
                <div className="book-detail-info">
                    <h1>{book.title}</h1>
                    <p className="author">Por {book.author}</p>
                    <p className="genre">Género: {book.genre}</p>
                    <p className="price">${book.price.toFixed(2)}</p>
                    <p className="description">{book.description}</p>
                    <div className="book-detail-actions">
                        <button onClick={() => addToCart(book)} className="button-primary">
                            <FaCartPlus style={{marginRight: '8px'}}/> Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;