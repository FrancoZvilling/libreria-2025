// src/contexts/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localCart = localStorage.getItem('cartItems');
        return localCart ? JSON.parse(localCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.id === book.id);
            if (itemExists) {
                return prevItems.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (bookId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
    };

    const updateQuantity = (bookId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item // Evita cantidad 0 o negativa
            )
        );
    };
    
    const clearCart = () => {
        setCartItems([]);
    }

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount }}
        >
            {children}
        </CartContext.Provider>
    );
};