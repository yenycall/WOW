import React from 'react';
import '../styles/Main.css';
import QuoteCard from '../components/QuoteCard';
import { quoteData } from '../data/quoteData';

const Quote = () => {
    return (
        <div className="main-container">
            <div className="quote-grid-container">
                <div className="keywordList">
                    <div className="keyword">Wisdom</div>
                    <div className="keywordText">Philosophy</div>
                </div>
                
                <div className="quote-grid">
                    {quoteData.map(quote => (
                        <QuoteCard
                            key={quote.id}
                            id={quote.id} 
                            images={quote.images}
                            name={quote.name}
                            birth={quote.birth}
                            quote={quote.quote}
                            type="quote"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quote;