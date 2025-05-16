// src/components/GenreDropdown.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../data/books'; // Asumiendo que exportaste 'genres'
import { FaChevronDown, FaBookOpen } from 'react-icons/fa';

const GenreDropdown = ({ onSelectGenre }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleGenreSelect = (genre) => {
        onSelectGenre(genre);
        setIsOpen(false); // Cierra el dropdown al seleccionar
    };

    return (
        <div className="genre-dropdown" 
             onMouseEnter={() => setIsOpen(true)} 
             onMouseLeave={() => setIsOpen(false)}>
            <button onClick={() => setIsOpen(!isOpen)} aria-haspopup="true" aria-expanded={isOpen}>
                <FaBookOpen /> <span style={{ marginLeft: '5px', marginRight: '5px', fontSize:'0.9rem' }}>Géneros</span> <FaChevronDown />
            </button>
            {isOpen && (
                <div className="genre-dropdown-content open">
                    <Link to="/" onClick={() => handleGenreSelect(null)}>Todos</Link>
                    {genres.map((genre) => (
                        <Link key={genre} to={`/?genre=${encodeURIComponent(genre)}`} onClick={() => handleGenreSelect(genre)}>
                            {genre}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreDropdown;