// src/components/Footer.js
import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Libreria Online Zwilling</h3>
                <p>
                    Somos apasionados por la lectura y creemos en el poder de los libros para transformar vidas.
                    Nuestra misión es hacer que la literatura sea accesible para todos, ofreciendo una amplia
                    variedad de e-books a precios justos y con una experiencia de compra moderna y amigable.
                </p>
                <div className="footer-socials">
                    <a href="https://wa.me/TUNUMERO" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <FaWhatsapp />
                    </a>
                    <a href="https://instagram.com/TUUSUARIO" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                </div>
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Libreria Online Zwilling. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;