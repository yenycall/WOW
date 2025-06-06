import React from 'react';
import '../../styles/ModalStyles/QuoteModal.css';
import '../../styles/Modal.css';
import { QuoteModalData } from '../../data/quoteData';

const QuoteModal = ({ isOpen, onClose, item }) => {
    if (!isOpen) return null;

    const data = QuoteModalData.find(quote => quote.id === item?.id) || QuoteModalData[0];

    const backgroundImage = data.backgroundImage && data.backgroundImage.length > 0 ? data.backgroundImage[0] : null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content quote-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-scroll-container">
                    <div className="quote-info">
                            <p className="quote-name">{data.name}</p>

                                <p className="quote-birth">{data.birth}</p>
                                <p className="quote-idea">{data.idea}</p>

                            <p 
                                className={`quote-quote ${backgroundImage ? 'background' : ''}`}
                                style={{
                                    '--bg-image': backgroundImage ? `url(${process.env.PUBLIC_URL}${backgroundImage})` : 'none'
                                }}
                            >
                                {data.quote}
                            </p>
                    </div>
       
                </div>
            </div>
        </div>
    );
};

export default QuoteModal;