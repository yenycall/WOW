import React from 'react';
import '../styles/Main.css';
import MovieCard from '../components/MovieCard';
import { movieData } from '../data/movieData';

const Movie = () => {
    return (
        <div className="main-container">
            <div className="movie-grid-container">
                <div className="keywordList">
                    <div className="keyword">Lines</div>
                    <div className="keywordText">THEATER</div>
                </div>
                
                <div className="movie-grid">
                    {movieData.map(movie => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id} // ID 추가
                            images={movie.images}
                            title={movie.title}
                            releaseYear={movie.releaseYear}
                            quote={movie.quote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movie;