// src/components/BookCarousel.js
import React, { useRef, useState, useEffect } from 'react';
import BookCard from './BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BookCarousel = ({ books, title = "Nuestros Libros" }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false); // Se determinará en useEffect

    // Intenta obtener el ancho de una tarjeta para un scroll más dinámico
    // Si no, usa un valor fijo.
    const getScrollAmount = () => {
        if (carouselRef.current && carouselRef.current.firstChild) {
            // Asumimos que todas las tarjetas tienen un ancho similar
            // offsetWidth incluye padding y borde, pero no margen.
            // getBoundingClientRect().width es más preciso.
            const firstCard = carouselRef.current.firstChild;
            const cardStyle = window.getComputedStyle(firstCard);
            const cardMarginRight = parseFloat(cardStyle.marginRight) || 0; // Si usas gap, esto no es necesario.
            const cardWidth = firstCard.getBoundingClientRect().width;
            const gap = 20; // El gap definido en CSS para .carousel-content

            // Queremos scrollear aproximadamente 3-4 tarjetas
            return (cardWidth + gap) * 3; 
        }
        return 600; // Valor de fallback si no se puede calcular
    };


    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            // Pequeño umbral para evitar problemas de flotantes
            const scrollThreshold = 1; 
            
            setCanScrollLeft(scrollLeft > scrollThreshold);
            setCanScrollRight(scrollLeft < (scrollWidth - clientWidth - scrollThreshold));
        } else {
            setCanScrollLeft(false);
            setCanScrollRight(false);
        }
    };

    useEffect(() => {
        // Ejecutar una vez al montar y cada vez que los libros cambien (por si el scrollWidth cambia)
        // o el tamaño de la ventana cambie (clientWidth cambia)
        const currentCarousel = carouselRef.current;
        if (currentCarousel) {
            checkScrollability(); // Chequeo inicial
            currentCarousel.addEventListener('scroll', checkScrollability);
            window.addEventListener('resize', checkScrollability);
        }

        return () => {
            if (currentCarousel) {
                currentCarousel.removeEventListener('scroll', checkScrollability);
            }
            window.removeEventListener('resize', checkScrollability);
        };
    }, [books]); // Dependencia en books para recalcular si el contenido cambia

    const scroll = (direction) => {
        if (carouselRef.current) {
            const amount = getScrollAmount();
            const scrollValue = direction === 'left' ? -amount : amount;
            carouselRef.current.scrollBy({ left: scrollValue, behavior: 'smooth' });
            // El checkScrollability se llamará automáticamente por el evento 'scroll'
        }
    };

    if (!books || books.length === 0) {
        return (
            <div className="container" style={{ padding: '20px 0' }}> {/* Añadido padding al contenedor del mensaje */}
                <h2>{title}</h2>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay libros que mostrar para esta selección.</p>
            </div>
        );
    }

    return (
        <section className="book-carousel-wrapper container">
            <h2>{title}</h2>
            <div className="carousel-container">
                {canScrollLeft && (
                    <button
                        className="carousel-button prev"
                        onClick={() => scroll('left')}
                        aria-label="Anterior"
                        disabled={!canScrollLeft}
                    >
                        <FaChevronLeft />
                    </button>
                )}
                <div className="carousel-content" ref={carouselRef}>
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
                {canScrollRight && (
                    <button
                        className="carousel-button next"
                        onClick={() => scroll('right')}
                        aria-label="Siguiente"
                        disabled={!canScrollRight}
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </section>
    );
};

export default BookCarousel;