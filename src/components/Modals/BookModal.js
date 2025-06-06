import React from 'react';
import '../../styles/ModalStyles/BookModal.css';
import '../../styles/Modal.css';
import { BookModalData } from '../../data/bookData';

const BookModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    const data = BookModalData.find(book => book.id === item?.id) || BookModalData[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content book-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-scroll-container">
                    <div className="book-info">
                            <p className="book-title">{data.title}</p>
                            <div className="book-sec">
                                <p className="book-author">{data.author}</p>
                                <p>&nbsp;/&nbsp;</p>
                                <p className="book-publish">{data.publish}</p>
                            </div>

                        <p className="book-sentence">{data.sentence}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;