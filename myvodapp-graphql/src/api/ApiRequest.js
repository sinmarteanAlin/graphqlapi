import Rx from 'rx-lite';

const TYPES = {
    get: 'GET',
    post: 'POST'
};

const HOST = 'http://localhost:3003/';
let token = [];

const doRequest = (url, type = TYPES.get, payload = {}) => {
    return Rx.Observable.create((observer) => {
        fetch(
            `${HOST}${url}`,
            {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'token': (type === TYPES.post) ? token : payload.token
                },
                body: (type === TYPES.post) ? JSON.stringify(payload) : null
            }
        )
        .then((response) => {
            if (!response.ok) {
                if ([400, 401, 404].indexOf(response.status) > -1) {
                    response.json().then(data => observer.onError({
                        message: data.message,
                        status: response.status
                    }))
                } else {
                    observer.onError({ message: 'API error' });
                }
                throw response;
            } else {
                return response.json();
            }
        }).then((json) => {
            if (json.token) {
                token = json.token;
            }
            observer.onNext({
                json
            });
        }).catch((err, res) => {
           observer.onError(err);
        })
    });
}

export function register(data) {
    return doRequest('register', TYPES.post, data);
}

export function login(data) {
    return doRequest('login', TYPES.post, data);
}

export function logout(token) {
    return doRequest('logout', TYPES.post, { token });
}

export function getFavMovies(nullArgument, token) {
    return doRequest('retrieve/favourite/movies', TYPES.post, { token });
}

export function addMovitToFav(data) {
    return doRequest('add/favourite/movie', TYPES.post, { ...data });
}

export function removeMovieFromFav(data) {
    return doRequest('remove/favourite/movie', TYPES.post, { ...data });
}

export function getGenres(nullArgument, token) {
    //made the first arg so that it matches the template in the getMovieData.js
    return doRequest('get/genres', TYPES.get, { token });
}

export function getGenreDetails(genreID, token) {
    return doRequest('browse/genre/' + genreID, TYPES.get, { token });
}

export function getMovieDetails(movieID, token) {
    return doRequest('movie/detail/' + movieID, TYPES.get, { token });
}

export function searchMovies(query) {
    return doRequest(`search/movie/${query}`, TYPES.get);
}

export function getSimilarMovies(movieID, token) {
    return doRequest(`movie/${movieID}/similar`, TYPES.get, { token });
}

export function getDifferentMoviesLists(listType, token) {
    return doRequest(`movie/${listType}`, TYPES.get, { token });
}

export function getMovieReviews(movieID, token) {
    return doRequest(`movie/${movieID}/reviews`, TYPES.get, { token });
}

export function getPopularActors(nullArgument, token) {
    return doRequest(`person/popular`, TYPES.get, { token });
}
