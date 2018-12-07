import { startFetching, stopFetching } from './appActions';
import { getMovieData } from '../components/common/js/getMovieData';
import {
    getGenreTypes,
    getGenreDetailsType,
    getMovieDetailsType,
    searchAllMoviesType,
    getSimilarMoviesType,
    getDifferentMoviesListsType,
    getMovieReviewsType,
    getPopularActorsType
} from './actionCreators/movieActionCreators';
import {
    getGenres,
    getGenreDetails,
    getMovieDetails,
    searchMovies,
    getSimilarMovies,
    getDifferentMoviesLists,
    getMovieReviews,
    getPopularActors
} from '../api/ApiRequest';

let searchObservable;
export const searchAMovie = (query, callback) =>
    dispatch =>
    {
        if (searchObservable && searchObservable.dispose) {
            searchObservable.dispose();
        }
        dispatch(startFetching());
        searchObservable = searchMovies(query)
        .subscribe(
            ({ json }) => {
                dispatch(searchAllMoviesType(json.results));
                dispatch(stopFetching());
                callback();
            },
            (err) => {
                dispatch(stopFetching());
                callback();
            }
        )
    };

export const getMovieGenres = () =>
    dispatch => {
        getMovieData(dispatch, getGenres, null, getGenreTypes);
    }

export const getMovieGenreDetails = (genreID) =>
    dispatch => {
        getMovieData(dispatch, getGenreDetails, genreID, getGenreDetailsType);
    }

export const getMovieDetailsAction = (movieID) =>
    dispatch => {
        getMovieData(dispatch, getMovieDetails, movieID, getMovieDetailsType);
    }

export const getSimilarMoviesAction = (movieID) =>
    dispatch => {
        getMovieData(dispatch, getSimilarMovies, movieID, getSimilarMoviesType);
    }


export const getDifferentMoviesListsAction = (listType) =>
    dispatch => {
        getMovieData(dispatch, getDifferentMoviesLists, listType, getDifferentMoviesListsType);
    }

export const getMovieReviewsAction = (movieID) =>
    dispatch => {
        getMovieData(dispatch, getMovieReviews, movieID, getMovieReviewsType);
    }

export const getPopularActorsAction = () =>
    dispatch => {
        getMovieData(dispatch, getPopularActors, null, getPopularActorsType);
    }
