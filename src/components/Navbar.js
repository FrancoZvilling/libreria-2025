// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { CartContext } from '../contexts/CartContext';
import GenreDropdown from './GenreDropdown';
import { FaShoppingCart, FaSun, FaMoon, FaSearch, FaHome } from 'react-icons/fa';
// Asegúrate de tener un logo.png en src/assets o public
// import logo from '../assets/logo.png'; // Si está en src/assets
const logoUrl = '/logo.png'; // Si está en public

const Navbar = ({ onSearch, onSelectGenre }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { cartItemCount, cartItems } = useContext(CartContext); // Añadido cartItems para el modal
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el modal del carrito
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    };

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo" onClick={() => { onSearch(''); onSelectGenre(null); setSearchTerm('');}}>
                    <img src={logoUrl} alt="Libreria Online Zwilling Logo" />
                    <span>Libreria Online Zwilling</span>
                </Link>

                <form className="navbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar libros por título o autor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" aria-label="Buscar"><FaSearch /></button>
                </form>

                <div className="navbar-actions">
                    <Link to="/" className="nav-link" aria-label="Inicio" onClick={() => { onSearch(''); onSelectGenre(null); setSearchTerm('');}}>
                        <FaHome />
                    </Link>
                    <GenreDropdown onSelectGenre={onSelectGenre} />
                    <button onClick={toggleTheme} aria-label="Cambiar tema">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                    <button onClick={handleCartToggle} className="cart-button" aria-label="Carrito de compras">
                        <FaShoppingCart />
                        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                    </button>
                </div>
            </nav>
            {/* Renderiza el CartModal aquí para que pueda ser controlado por Navbar */}
            {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
        </>
    );
};

// El CartModal necesita ser importado o definido
// Por simplicidad, lo definiré aquí, pero es mejor en su propio archivo
// src/components/CartModal.js

const CartModal = ({ onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);

    if (!cartItems) return null; // o un mensaje de carga/error si es asíncrono

    return (
        <div className="cart-modal-overlay open" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}> {/* Evita que el clic se propague y cierre el modal */}
                <div className="cart-modal-header">
                    <h2>Tu Carrito</h2>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                {cartItems.length === 0 ? (
                    <p className="empty-cart">Tu carrito está vacío.</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.imageUrl || '/book-covers/placeholder.jpg'} alt={item.title} />
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <p>Precio: ${item.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        min="1"
                                    />
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                <div className="cart-item-remove">
                                    <button onClick={() => removeFromCart(item.id)}>×</button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            Total: ${cartTotal.toFixed(2)}
                        </div>
                        <div className="cart-actions">
                            <button className="button-secondary" onClick={clearCart}>Vaciar Carrito</button>
                            <button className="button-primary">Proceder al Pago</button> {/* Funcionalidad futura */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


export default Navbar;