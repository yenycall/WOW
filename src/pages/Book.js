import React from 'react';
import '../styles/Main.css';
import BookCard from '../components/BookCard';
import { bookData } from '../data/bookData';

const Book = () => {
    return (
        <div className="main-container">
            <div className="book-grid-container">
                <div className="keywordList">
                    <div className="keyword">Sentence</div>
                    <div className="keywordText">Book Shelf</div>
                </div>

                <div className="book-grid">
                    {bookData.map(book => (
                        <BookCard
                            key={book.id}
                            id={book.id} 
                            imageUrl={book.imageUrl}
                            title={book.title}
                            name={book.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Book;