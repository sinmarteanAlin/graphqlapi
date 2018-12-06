module.exports = (app) => {
    const db = require('../controllers/themoviedb.controller.js');

    // get the genres lists
    app.get('/get/genres', db.listGenres);

    // get movies from a category
    app.get('/browse/genre/:genre', db.getMoviesFromGenre);

    // get movie details
    app.get('/movie/detail/:movie', db.getMovieDetail);

    // search a movie
    app.get('/search/movie/:query', db.searchMovies);

    // get similar movies
    app.get('/movie/:movieID/similar', db.getSimilarMovies);

    // get different movies list
    app.get('/movie/:listType', db.getDiferentMoviesList);

    // get movie reviews
    app.get('/movie/:movieID/reviews', db.getMovieReviews);

    // get popular actors
    app.get('/person/popular', db.getPopularActors);

};
