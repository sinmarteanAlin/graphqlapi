const users = require('./user.controller.js');
const Genre = require('../models/genre.model.js');
const Movie = require('../models/movie.model.js');
const axios = require('axios');
const apiKey = "397d362272fc6627b50061dd0492dd01";

const buildUrl = (str, query) => {
    return `https://api.themoviedb.org/3/${str}?api_key=${apiKey}&lang=en-US${query?`&query=${query}`: ''}`;
};

const makeGet = (url, success, error) => {
    axios.get(url)
        .then(response => {
            success(response.data);
        })
        .catch(err => {
            error(err);
        });
};

const getGenreList = (cb = () => {}) => {
    Genre.find().then(genres => {
        if (!genres || !genres.length) {
            cb(false);
        } else {
            cb(genres);
        }
    });
};

exports.searchMovies = (req, res) => {
    const query = req.params.query;
    makeGet(
        buildUrl(`search/movie`, query),
        (data) => {
            if (data) {
                res.status(200).send(data);
            }
        },
        (error) => {
            res.status(404).send({
				message: 'Cannot find movie!'
			});
        }
    );
};

exports.getSimilarMovies = (req, res) => {
    const movieID = req.params.movieID;
    makeGet(
        buildUrl(`movie/${movieID}/similar`),
        (data) => {
            if (data) {
                res.status(200).send(data);
            }
        },
        (error) => {
            res.status(404).send({
				message: 'Cannot find movie!'
			});
        }
    );
};

exports.getMovieReviews = (req, res) => {
    const movieID = req.params.movieID;
    makeGet(
        buildUrl(`movie/${movieID}/reviews`),
        (data) => {
            if (data) {
                res.status(200).send(data);
            }
        },
        (error) => {
            res.status(404).send({
				message: 'Cannot find movie!'
			});
        }
    );
};

exports.getPopularActors = (req, res) => {
    makeGet(
        buildUrl(`person/popular`),
        (data) => {
            if (data) {
                res.status(200).send(data);
            }
        },
        (error) => {
            res.status(404).send({
				message: 'Cannot find movie!'
			});
        }
    );
}


exports.getDiferentMoviesList = (req, res) => {
    const listType = req.params.listType;
    makeGet(
        buildUrl(`movie/${listType}`),
        (data) => {
            if (data) {
                res.status(200).send(data);
            }
        },
        (error) => {
            res.status(404).send({
				message: 'Cannot find movie!'
			});
        }
    );
};

const saveGenreList = ({ genres = [] }, cb) => {
    let i = 0;
    genres.forEach((genre) => {
        const newGenre = new Genre({
            id: genre.id,
            name: genre.name,
            picture: 'http://www.magix.com/fileadmin/user_upload/Produkte/Musik/Music_Maker_Special_Editions_6/Music_Maker_Movie_Score_Edition/Detail/grafik-musicmaker-moviescore-header-int.jpg'
        });
        newGenre.save(() => {
            i++;
            if (i === genres.length) {
                cb();
            }
        });
    })
};

const getGenreIdentifier = (id, cb) => {
    Genre.findOne({
        id
    }, (err, genre) => {
        if (err || !genre.id) {
            cb(false);
        } else {
            cb(`${id}-${genre.name.toLowerCase()}`);
        }
    });
};

const getMoviesForGenre = (id, cb = () => {}) => {
    Movie.find({
        "$where": `function() { return this.genre_ids.indexOf(${id}) !== -1; }`
    }, (err, movies) => {
        if (err || !movies || !movies.length) {
            cb(false);
        } else {
            cb(movies);
        }
    })
};

const saveMovies = ({ results = [] }, cb = () => {}) => {
    let i = 0;
    results.forEach((movie) => {
        const newMovie = new Movie(movie);
        newMovie.save(() => {
            i++;
            if (i === results.length) {
                cb();
            }
        });
    })
};

const catchLogin = (req, res, callback) => {
    const {
        headers: {
            token
        } = {}
    } = req;
    if (!token) {
        res.status(401).send({
            message: 'Authorization needed!'
        });
    } else {
        users.validate(token, (status) => {
            if (status) {
                callback();
            } else {
                res.status(401).send({
                    message: 'Invalid token!'
                });
            }
        })
    }
};

exports.listGenres = (req, res) => {
    catchLogin(req, res, () => {
        const requireData = (cb = () => {}) => {
            makeGet(
                buildUrl('genre/movie/list'),
                (data) => {
                    saveGenreList(data, (err) => {
                        if (err) {
                            if (cb) {
                                cb(false);
                            }
                        } else {
                            getGenreList(cb);
                        }
                    });
                },
                () => {
                    if (cb) {
                        cb(false);
                    }
                }
            );
        };

        getGenreList((data) => {
            if (data === false || !data.length) {
                requireData((genres) => {
                    if (!genres) {
                        res.status(404).send({
                            message: 'Cannot get genre list!'
                        });
                    } else {
                        res.status(200).send(genres);
                    }
                });
            } else {
                res.status(200).send(data);
                requireData();
            }
        });

    })
};

exports.getMoviesFromGenre = (req, res) => {
    catchLogin(req, res, () => {
        const requireData = (ident, cb = () => {}) => {
            makeGet(
                buildUrl(`genre/${ident}/movies`),
                (data) => {
                    saveMovies(data, (err) => {
                        if (err) {
                            if (cb) {
                                cb(false);
                            }
                        } else {
                            getMoviesForGenre(data.id, cb);
                        }
                    });
                },
                () => {
                    cb(false);
                }
            )
        };

        getGenreIdentifier(req.params.genre, (ident) => {
            if (!ident) {
                res.status(404).send({
                    message: 'Genre not found!'
                });
            } else {
                getMoviesForGenre(req.params.genre, (movies) => {
                    if (!movies || !movies.length) {
                        requireData(ident, (mvs) => {
                            if (!mvs || !mvs.length) {
                                res.status(404).send({
                                    message: 'Cannot get movies for the provided genre!'
                                });
                            } else {
                                res.status(200).send(mvs);
                            }
                        });
                    } else {
                        res.status(200).send(movies);
                        requireData(ident);
                    }
                });
            }
        });
    });
};

exports.getMovieDetail = (req, res) => {
    catchLogin(req, res, () => {
		const id = req.params.movie;
       makeGet(
           buildUrl(`movie/${id}`),
           (movie) => {
			   const returnDefault = () => {
				   res.status(200).send({
					   ...movie,
					   poster_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
				   });
			   };

               makeGet(
                   buildUrl(`movie/${id}/videos`),
                   (videos) => {
						makeGet(
							buildUrl(`movie/${id}/credits`),
							(credits) => {
								   res.status(200).send({
									   ...movie,
									   poster_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`,
									   videos: [
										   ...videos.results
									   ],
									   credits: {
										   cast: [
												...credits.cast.map(cast => ({
													...cast,
													profile_path: `https://image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`
												}))
										   ],
										   crew: [
												...credits.crew.map(crew => ({
													...crew,
													profile_path: `https://image.tmdb.org/t/p/w138_and_h175_face${crew.profile_path}`
												}))
										   ]
									   }
								   });
							},
							returnDefault
						);
                   },
                   returnDefault
               );
           },
           () => {
				res.status(404).send({
					message: 'Cannot find movie!'
				});
		   }
       )
    });
};
