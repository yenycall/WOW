import React from 'react';
import '../styles/BookCard.css';
import LikeButton from './LikeButton';
import { useModal } from '../context/ModalContext';

const BookCard = ({ id, imageUrl, title, name }) => {

    const bookData = { id, title, name, imageUrl: process.env.PUBLIC_URL + imageUrl };


    const { openModal } = useModal();


    const handleCardClick = (e) => {

        if (e.target.closest('.like-button')) {
            return;
        }


        openModal(bookData);
    };

    return (
        <div className="book-card-container">
            <div className="book-card" onClick={handleCardClick}>
                <div className="book-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})` }}>
                    <div className="gradient-overlay"></div>

                    {/* 좋아요 버튼 추가 */}
                    <LikeButton id={id} quoteData={bookData} />
                </div>
            </div>
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p className="book-name">{name}</p>
            </div>
        </div>
    );
};

export default BookCard;