// src/components/BookCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { FaCartPlus, FaInfoCircle } from 'react-icons/fa';

const BookCard = ({ book }) => {
    const { addToCart } = useContext(CartContext);

    if (!book) return null; // O un componente de carga/error

    return (
        <div className="book-card">
            <Link to={`/book/${book.id}`} className="book-card-image-link">
                 <div className="book-card-image">
                    <img src={book.imageUrl || '/book-covers/placeholder.jpg'} alt={book.title} />
                </div>
            </Link>
            <div className="book-card-content">
                <h3 className="book-card-title" title={book.title}>{book.title}</h3>
                <p className="book-card-author">{book.author}</p>
                <p className="book-card-price">${book.price.toFixed(2)}</p>
                <div className="book-card-actions">
                    <button onClick={() => addToCart(book)} className="button-primary">
                        <FaCartPlus /> Añadir
                    </button>
                    <Link to={`/book/${book.id}`} className="button-secondary">
                        <FaInfoCircle /> Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;