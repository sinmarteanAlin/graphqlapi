import React from "react";

const Genres = (props) => {
    const mapGenresToList = () => {
        const genresContainer = [];
        props.genres.map((genre) => {
            genresContainer.push(<li key={genre.id} onClick={() => props.onClick(genre.id)}>{genre.name}</li>);
            return genresContainer;
        });
        return genresContainer;
    };

    return (
        <div className="movie-header-container">
            <h5 className="genres-list-title">List of genres:</h5>
            <ul className="genre-list-items">
                {mapGenresToList()}
            </ul>
        </div>
    );
};

export default Genres;
