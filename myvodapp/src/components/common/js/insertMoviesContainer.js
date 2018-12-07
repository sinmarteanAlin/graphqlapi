import React from 'react';
import Card from "../../widgets/card/Card";

const insertMoviesContainer = (json, onClickEvent, needsImageExtraUrl, isReview) => {
    const container = [];

    if (!isReview) {
        Object.values(json).map((movie) => {
            container.push(
                <Card
                    horizontalCard={true}
                    key={movie.id}
                    title={movie.original_title}
                    release_date={movie.release_date}
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                    imageSrc={(needsImageExtraUrl) ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}` : movie.poster_path}
                    onClick={() => {onClickEvent(movie.id)}}
                />
            );
            return container;
        });
        return container;
    } else {
        json.results.map((result) => {
            container.push(
                <Card
                    horizontalCard={true}
                    key={result.id}
                    original_title={result.author}
                    overview={result.content}
                    isReview={true}
                    />
                );
            return container;
        });
        return container;
    }
}

export default insertMoviesContainer;
