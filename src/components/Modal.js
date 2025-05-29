import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
        }
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const images = Array.isArray(item.images)
        ? item.images
        : item.imageUrl
            ? [item.imageUrl]
            : [];

    const nextImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };


    const prevImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };


    const currentImage = images[currentImageIndex];


    const renderContent = () => {

        if (item.releaseYear) {
            return (
                <>
                    <h2 className="modal-title">{item.title}</h2>
                    <p className="modal-subtitle">{item.releaseYear}</p>
                    {item.quote && <p className="modal-quote">"{item.quote}"</p>}
                </>
            );
        }

        else if (item.birth) {
            return (
                <>
                    <h2 className="modal-title">{item.name}</h2>
                    <p className="modal-subtitle">{item.birth}</p>
                    {item.quote && Array.isArray(item.quote) && (
                        <div className="modal-quotes">
                            {item.quote.map((q, index) => (
                                <p key={index} className="modal-quote">{q}</p>
                            ))}
                        </div>
                    )}
                </>
            );
        }

        else {
            return (
                <>
                    <h2 className="modal-title">{item.title}</h2>
                    <p className="modal-subtitle">{item.name}</p>
                </>
            );
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-image-container">
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt={item.title || item.name}
                            className="modal-image"
                        />
                    )}

                    {images.length > 1 && (
                        <>
                            <button className="modal-nav prev" onClick={prevImage}>‹</button>
                            <button className="modal-nav next" onClick={nextImage}>›</button>

                            <div className="modal-dots">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`modal-dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="modal-info">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Modal;