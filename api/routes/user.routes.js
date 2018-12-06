module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Register a new user
    app.post('/register', users.register);

    // Login a user
    app.post('/login', users.login)

    // Logout a user
    app.post('/logout', users.logout);

    // Browse user favourite movies
    app.post('/retrieve/favourite/movies', users.getFavouriteMovies);

    // Add movie to favourites
    app.post('/add/favourite/movie', users.addMovieToFavourites);

    //Remove movie from favourites
    app.post('/remove/favourite/movie', users.removeMovieFromFavourites);
};
