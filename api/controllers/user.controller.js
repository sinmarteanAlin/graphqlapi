const User = require('../models/user.model.js');
const validator = require ('../utils/validator.util.js');

const rand = () => Math.random().toString(36).substr(2);

const token = () => rand() + rand();

// Register a new user
exports.register = (req, res) => {
    // Validate request
    let errors = [];

    const {
        body: {
            username,
            email,
            password,
            repassword
        } = {}
    } = req;

    errors.push(validator.validateUsername(username));
    errors.push(validator.validateEmailAddress(email));
    errors.push(validator.validatePassword(password));
    errors.push(validator.validateRePassword(repassword));

    // check whether or not the passwords matches
    if (password !== repassword) {
        errors.push('The provided password are not the same!');
    }
    const errs = errors.filter(error => error !== false);
    if (errs.length) {
        return res.status(400).send({
            message: errs.join(' ')
        });
    } else {
        User.find({
            username,
            email
        }, (err, user) => {
            if (err) {
                res.status(400).send({
                    message: user.length
                        ? 'Username/email is already in use!'
                        : err.message
                });
            } else if (!err && !user.length) {
                // new user, create it
                const newToken = token();
                const newUser = new User({
                    username,
                    email,
                    password,
                    token: newToken
                });
                newUser.save(error => {
                    if (error) {
                        res.status(400).send({
                            message: 'Username/email is already in use!'
                        });
                    } else {
                        res.status(200).send({
                            username,
                            email,
                            token: newToken
                        });
                    }
                });
            } else {
                // user exists, throw it
                return res.status(400).send({
                    message: 'The provided username/email is already used!'
                });
            }
        });
    }
};

// Login user
exports.login = (req, res) => {
    // Validate request
    let errors = [];
    const {
        body: {
            username,
            password
        } = {}
    } = req;

    errors.push(validator.validateUsername(username));
    errors.push(validator.validatePassword(password));
    const errs = errors.filter(error => error !== false);
    if (errs.length) {
        return res.status(400).send({
            message: errs.join(' ')
        });
    } else {
        User.findOne({
            username
        }, (err, user) => {
            if (err || user === null) {
                res.status(400).send({
                    message: 'Invalid login data!'
                });
            } else if (!err && !user._id) {
                res.status(400).send({
                    message: 'There is no user with this username!'
                });
            } else {
                // user exists, throw it
                user.comparePassword(password, function(err, isMatch) {
                    if (err || !isMatch) {
                        res.status(400).send({
                            message: 'Invalid login data!'
                        });
                    } else {
                        const newToken = token();
                        user.update({
                            token: newToken
                        }, (e) => {
                            if (e) {
                                res.status(400).send({
                                    message: e.message
                                });
                            } else {
                                res.status(200).send({
                                    email: user.email,
                                    username: user.username,
                                    token: newToken
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

// Logout user
exports.logout = (req, res) => {
    // Validate request
    const {
        body: {
            token
        } = {}
    } = req;
    User.findOne({
        token
    }, (err, user) => {
        if (err || user === null) {
            res.status(400).send({
                message: 'Invalid token!'
            });
        } else if (!err && !user._id) {
            res.status(400).send({
                message: 'There is no user with this token!'
            });
        } else {
            user.update({
                token: ''
            }, (e) => {
                if (e) {
                    res.status(400).send({
                        message: 'There was a problem while logout!'
                    });
                } else {
                    res.status(200).send({ success: true });
                }
            });
        }
    });
};

exports.getFavouriteMovies = (req, res) => {
    const {
        body: {
            token
        } = {}
    } = req;

    User.findOne({
        token
    }, (err, user) => {
        if (err || user === null) {
            res.status(400).send({
                message: 'Invalid token!'
            });
        } else if (!err && !user._id) {
            res.status(400).send({
                message: 'There is no user with this token!'
            });
        } else {
            res.status(200).send({
                favouriteMoviesId: user.favouriteMoviesId,
                favouriteMoviesTitle: user.favouriteMoviesTitle,
                favouriteMoviesDate: user.favouriteMoviesDate,
                favouriteMoviesOverview: user.favouriteMoviesOverview,
                favouriteMoviesPoster: user.favouriteMoviesPoster
            });
        }
    });
};

exports.addMovieToFavourites = (req, res) => {
    const {
        body: {
            token,
            movieId,
            original_title,
            release_date,
            overview,
            poster_path
        } = {}
    } = req;

    User.findOne({
        token
    }, (err, user) => {
        if (err || user === null) {
            res.status(400).send({
                message: 'Invalid token!'
            });
        } else if (!err && !user._id) {
            res.status(400).send({
                message: 'There is no user with this token!'
            });
        } else {
            const newFavouriteMoviesId = user.favouriteMoviesId;
            newFavouriteMoviesId.push(movieId);

            const newFavouriteMoviesTitle = user.favouriteMoviesTitle;
            newFavouriteMoviesTitle.push(original_title);

            const newFavouriteMoviesDate = user.favouriteMoviesDate;
            newFavouriteMoviesDate.push(release_date);

            const newFavouriteMoviesOverview = user.favouriteMoviesOverview;
            newFavouriteMoviesOverview.push(overview);

            const newFavouriteMoviesPoster = user.favouriteMoviesPoster;
            newFavouriteMoviesPoster.push(poster_path);

            user.update({
                favouriteMoviesId: newFavouriteMoviesId,
                favouriteMoviesTitle: newFavouriteMoviesTitle,
                favouriteMoviesDate: newFavouriteMoviesDate,
                favouriteMoviesOverview: newFavouriteMoviesOverview,
                favouriteMoviesPoster: newFavouriteMoviesPoster
            }, (e) => {
                if (e) {
                    res.status(400).send({
                        message: e.message
                    });
                } else {
                    res.status(200).send({
                        favouriteMoviesId: user.favouriteMoviesId,
                        favouriteMoviesTitle: user.favouriteMoviesTitle,
                        favouriteMoviesDate: user.favouriteMoviesDate,
                        favouriteMoviesOverview: user.favouriteMoviesOverview,
                        favouriteMoviesPoster: user.favouriteMoviesPoster
                    });
                }
            });
        }
    });
};

exports.removeMovieFromFavourites = (req, res) => {
    const {
        body: {
            token,
            movieId,
            original_title,
            release_date,
            overview,
            poster_path
        } = {}
    } = req;

    User.findOne({
        token
    }, (err, user) => {
        if (err || user === null) {
            res.status(400).send({
                message: 'Invalid token!'
            });
        } else if (!err && !user._id) {
            res.status(400).send({
                message: 'There is no user with this token!'
            });
        } else {
            const newFavouriteMoviesId = user.favouriteMoviesId;
            const movieIdIndex = newFavouriteMoviesId.indexOf(movieId);
            if (movieIdIndex > -1) {
                newFavouriteMoviesId.splice(movieIdIndex, 1);
            }

            const newFavouriteMoviesTitle = user.favouriteMoviesTitle;
            const movieTitleIndex = newFavouriteMoviesTitle.indexOf(original_title);
            if (movieTitleIndex > -1) {
                newFavouriteMoviesTitle.splice(movieTitleIndex, 1);
            }

            const newFavouriteMoviesDate = user.favouriteMoviesDate;
            const movieDateIndex = newFavouriteMoviesDate.indexOf(release_date);
            if (movieDateIndex > -1) {
                newFavouriteMoviesDate.splice(movieDateIndex, 1);
            }

            const newFavouriteMoviesOverview = user.favouriteMoviesOverview;
            const movieOverviewIndex = newFavouriteMoviesOverview.indexOf(overview);
            if (movieOverviewIndex > -1) {
                newFavouriteMoviesOverview.splice(movieOverviewIndex, 1);
            }

            const newFavouriteMoviesPoster = user.favouriteMoviesPoster;
            const moviePosterIndex = newFavouriteMoviesPoster.indexOf(poster_path);
            if (moviePosterIndex > -1) {
                newFavouriteMoviesPoster.splice(moviePosterIndex, 1);
            }

            user.update({
                favouriteMoviesId: newFavouriteMoviesId,
                favouriteMoviesTitle: newFavouriteMoviesTitle,
                favouriteMoviesDate: newFavouriteMoviesDate,
                favouriteMoviesOverview: newFavouriteMoviesOverview,
                favouriteMoviesPoster: newFavouriteMoviesPoster

            }, (e) => {
                if (e) {
                    res.status(400).send({
                        message: e.message
                    });
                } else {
                    res.status(200).send({
                        favouriteMoviesId: user.favouriteMoviesId,
                        favouriteMoviesTitle: user.favouriteMoviesTitle,
                        favouriteMoviesDate: user.favouriteMoviesDate,
                        favouriteMoviesOverview: user.favouriteMoviesOverview,
                        favouriteMoviesPoster: user.favouriteMoviesPoster
                    });
                }
            });
        }
    });
};

// Logout user
exports.validate = (token, callback) => {
    User.findOne({
        token
    }, (err, user) => {
        if (err || user === null) {
            callback(false);
        } else if (!err && !user._id) {
            callback(false);
        } else {
            callback(true);
        }
    });
};
