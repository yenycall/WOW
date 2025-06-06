import React, { useState, useEffect } from 'react';
import '../styles/BookCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const BookCard = ({ id, imageUrl, title, name }) => {
    const [isChecked, setIsChecked] = useState(false);

    const bookData = { id, title, name, imageUrl: process.env.PUBLIC_URL + imageUrl };

    const { openModal } = useModal();

    useEffect(() => {
        const checkedItems = JSON.parse(localStorage.getItem('checkedBookCards') || '[]');
        setIsChecked(checkedItems.includes(id));
    }, [id]);

    const handleCardClick = (e) => {
        if (e.target.closest('.like-button')) {
            return;
        }

        if (!isChecked) {
            setIsChecked(true);
            
            const checkedItems = JSON.parse(localStorage.getItem('checkedBookCards') || '[]');
            if (!checkedItems.includes(id)) {
                checkedItems.push(id);
                localStorage.setItem('checkedBookCards', JSON.stringify(checkedItems));
            }
        }

        openModal(bookData, 'book');
    };

    return (
        <div className={`book-card-container ${isChecked ? 'checked' : ''}`}>
            <div className="book-card" onClick={handleCardClick}>
                <div className="book-image">
                    <div 
                        style={{ 
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: isChecked ? 0.5 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    ></div>
                    
                    <div 
                        className="gradient-overlay"
                        style={{
                            opacity: isChecked ? 0.5 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    ></div>
                    
                    <LikeButton id={id} quoteData={bookData} />
                </div>
            </div>
            <div 
                className="book-info"
                style={{
                    opacity: isChecked ? 0.6 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            >
                <h3 className="book-title">{title}</h3>
                <p className="book-name">{name}</p>
            </div>
        </div>
    );
};

export default BookCard;