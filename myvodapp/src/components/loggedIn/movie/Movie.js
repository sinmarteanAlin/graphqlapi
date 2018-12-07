import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from "./components/Header";
import Genres from "./components/Genres";
import TopCast from "./components/TopCast";
import Video from "./components/Video";
import Favourite from "./components/Favourite";
import "./css/style.css";
import CircularProgressBar from '../../widgets/circularProgressBar/CircularProgressBar';
import insertMoviesContainer from '../../common/js/insertMoviesContainer';
import { getMovieDetailsAction, getSimilarMoviesAction } from '../../../actions/movieActions';
import {
    getFavouriteMoviesFromUser,
    addMovieToFavourites,
    removeMovieFromFavourites
} from '../../../actions/userDataActions';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.routeId = props.routeParams.id;
        this.props.getMovieDetailsAction(this.routeId);
        if (!this.props.favouriteMovies.favouriteMoviesId) {
            this.props.getFavouriteMoviesFromUser();
        }

        this.isFavouriteMovie = false;
        this.props.getSimilarMoviesAction(this.routeId);
    }

    insertMovieHeader() {
        const {
            movieContent: {
                original_title = '',
                overview = '',
                release_date = '',
                poster_path
            } = {}
        } = this.props;

        return (
            <Header
                title={original_title}
                overview={overview}
                release_date={release_date.split('', 4)}
                poster_path={poster_path}
            />
        );
    }

    genreLinkRedirect(genreId) {
        this.context.router.push("/category/" + genreId);
    }

    insertGenreList() {
        return (
            <Genres
                genres={this.props.movieContent.genres}
                onClick={this.genreLinkRedirect.bind(this)}
            />
        );
    }

    insertCastList() {
        const castObj = [];
        const castView = [];
        for (let i = 0; i < 5; i++) {
            castObj.push(this.props.movieContent.credits.cast[i]);
        }

        castObj.map((cast) => {
            castView.push(
                <TopCast
                    id={cast.id + cast.name}
                    profile_path={cast.profile_path}
                    name={cast.name}
                    character={cast.character}
                />
            );
            return castView;
        });
        return castView;
    }

    insertVideoItems() {
        const videoContainer = [];
        if (this.props.movieContent.videos.length > 0) {
            this.props.movieContent.videos.map((video) => {
                videoContainer.push(
                    <Video
                        video_key={video.key}
                    />
                );
                return videoContainer;
            })
            return videoContainer;
        } else {
            return (
                <h5>This movie does not have any videos associated with it...</h5>
            );
        }
    }

    handleClick = () => {
        this.context.router.push("/full-cash-and-crew/" + this.routeId);
    }

    handleReviewsClick = () => {
        this.context.router.push("/browse-reviews/" + this.routeId);
    }

    insertFavouriteMovies = () => {
        this.isFavouriteMovie = false;
        this.props.favouriteMovies.favouriteMoviesId.map((favMovies) => {
            if (favMovies === this.routeId) {
                this.isFavouriteMovie = true
            }
            return this.isFavouriteMovie;
        })

        return (
            <Favourite
                isFavourite={this.isFavouriteMovie}
                handleClick={this.clickFavouriteItem}
            />
        )
    }

    onClick = (movieId) => {
        this.context.router.push("/movie/" + movieId);
    }

    clickFavouriteItem = () => {
        //id , original_title, release_date, overview, poster_path
        const {
            movieContent: {
                original_title = '',
                overview = '',
                release_date = '',
                poster_path
            } = {}
        } = this.props;

        if (!this.isFavouriteMovie) {
            this.props.addMovieToFavourites(this.routeId, original_title, release_date, overview, poster_path);
        } else {
            this.props.removeMovieFromFavourites(this.routeId, original_title, release_date, overview, poster_path);
        }
    }

    insertSimilarMoviesWrapper = () => {
        if (this.isFavouriteMovie) {
            return (
                <div className="container-fluid">
                <h3 className="section-title margin-top-section white-text">Similar movies from the same category!</h3>
                    <div className="row">
                        {insertMoviesContainer(this.props.similarMoviesReducer.results, this.onClick, 1) }
                    </div>
                </div>
            );
        }
    }

    render() {

        if (this.props.movieContent !== null && this.props.favouriteMovies !== null) {
            let url = "https://image.tmdb.org/t/p/w1400_and_h450_face/" + this.props.movieContent.backdrop_path;
            var styleContainer = {
                backgroundImage: "url(" + url + ")"
            }

            return (
                <div>
                    <div style={styleContainer} className="container-fluid movie-page-container white-text">
                        <div className="row">
                            <div className="color-background">
                                {this.insertMovieHeader()}
                                {this.insertGenreList()}
                                <h5>User score:</h5>
                                <CircularProgressBar
                                    value={this.props.movieContent.vote_average}
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className="section-title margin-top-section white-text">Top Billed Cast</h3>

                    <div className="container margin-top-section">
                        <div className="row">
                            {this.insertCastList()}
                        </div>
                    </div>

                    <div className="section-title white-text">
                        <h3><span onClick={this.handleClick}>See full cast and crew</span></h3>
                    </div>

                    <div className="section-title white-text">
                        <h3><span onClick={this.handleReviewsClick}>See all reviews</span></h3>
                    </div>

                    <div className="videos-container white-text">
                        <h3>Videos: </h3>
                        <div className="videos-content-wrapper">
                            {this.insertVideoItems()}
                        </div>
                    </div>

                    <div className="favourite-videos-wrapper">
                        {this.insertFavouriteMovies()}
                    </div>

                    {this.insertSimilarMoviesWrapper()}
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

Movie.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        movieContent: state.movieContentReducer,
        favouriteMovies: state.favouriteMoviesReducer,
        similarMoviesReducer: state.similarMoviesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieDetailsAction,
        getFavouriteMoviesFromUser,
        addMovieToFavourites,
        removeMovieFromFavourites,
        getSimilarMoviesAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
