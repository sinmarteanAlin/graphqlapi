import {
    GET_MOVIE_GENRES,
    GET_MOVIE_GENRE_DETAILS,
    GET_MOVIE_DETAILS,
    SEARCH_MOVIE,
    GET_SIMILAR_MOVIES,
    GET_DIFFERENT_MOVIE_LISTS,
    GET_MOVIE_REVIEWS,
    GET_POPULAR_ACTORS
} from '../actionTypes';

export function getGenreTypes(data) {
    return {
        type: GET_MOVIE_GENRES,
        data
    };
}

export function getGenreDetailsType(data) {
    return {
        type: GET_MOVIE_GENRE_DETAILS,
        data
    };
}

export function getMovieDetailsType(data) {
    return {
        type: GET_MOVIE_DETAILS,
        data
    };
}

export function searchAllMoviesType(data) {
    return {
        type: SEARCH_MOVIE,
        data
    };
}

export function getSimilarMoviesType(data) {
    return {
        type: GET_SIMILAR_MOVIES,
        data
    };
}

export function getDifferentMoviesListsType(data) {
    return {
        type: GET_DIFFERENT_MOVIE_LISTS,
        data
    }
}

export function getMovieReviewsType(data) {
    return {
        type: GET_MOVIE_REVIEWS,
        data
    }
};

export function getPopularActorsType(data) {
    return {
        type: GET_POPULAR_ACTORS,
        data
    }
}
