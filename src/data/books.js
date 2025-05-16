// src/data/books.js
export const allBooks = [
    {
        id: '1',
        title: 'El Señor de los Anillos',
        author: 'J.R.R. Tolkien',
        price: 15.99,
        imageUrl: '/book-covers/lotr.jpg', // Asegúrate de tener estas imágenes en public/book-covers/
        genre: 'Fantasía',
        description: 'Una épica aventura en la Tierra Media para destruir el Anillo Único.',
    },
    {
        id: '2',
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        price: 12.50,
        imageUrl: '/book-covers/cien-anos.jpg',
        genre: 'Realismo Mágico',
        description: 'La historia de la familia Buendía a lo largo de siete generaciones en el mítico pueblo de Macondo.',
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        price: 10.00,
        imageUrl: '/book-covers/1984.jpg',
        genre: 'Ciencia Ficción',
        description: 'Una sombría visión de un futuro totalitario donde el Gran Hermano todo lo ve.',
    },
    {
        id: '4',
        title: 'Orgullo y Prejuicio',
        author: 'Jane Austen',
        price: 9.99,
        imageUrl: '/book-covers/orgullo-prejuicio.jpg',
        genre: 'Romance',
        description: 'La historia de Elizabeth Bennet y el Sr. Darcy en la Inglaterra georgiana.',
    },
    {
        id: '5',
        title: 'Crónica de una Muerte Anunciada',
        author: 'Gabriel García Márquez',
        price: 8.75,
        imageUrl: '/book-covers/cronica.jpg',
        genre: 'Realismo Mágico',
        description: 'La reconstrucción de un asesinato anunciado y la inevitabilidad del destino.',
    },
    // Agrega más libros (unos 15-20 para probar el carrusel y géneros)
    {
        id: '6',
        title: 'Dune',
        author: 'Frank Herbert',
        price: 14.50,
        imageUrl: '/book-covers/dune.jpg',
        genre: 'Ciencia Ficción',
        description: 'En el lejano futuro, Paul Atreides y su familia toman el control del planeta desértico Arrakis, única fuente de la especia melange.',
    },
    {
        id: '7',
        title: 'Harry Potter y la Piedra Filosofal',
        author: 'J.K. Rowling',
        price: 11.99,
        imageUrl: '/book-covers/hp1.jpg',
        genre: 'Fantasía',
        description: 'El inicio de las aventuras del joven mago Harry Potter en Hogwarts.',
    },
    // ... más libros de fantasía, ciencia ficción, romance, etc.
];

export const genres = [...new Set(allBooks.map(book => book.genre))]; // Obtiene géneros únicos