import { combineReducers } from 'redux';
import user from './userReducer';
import movies from './moviesReducer';
import app from './appReducer';
import movieCategoryReducer from './movieCategoryReducer';
import movieContentReducer from './movieContentReducer';
import movieSearchReducer from './movieSearchReducer';
import favouriteMoviesReducer from './favouriteMoviesReducer';
import similarMoviesReducer from './similarMoviesReducer';
import differentMoviesListReducer from './differentMoviesListReducer';
import movieReviewsReducer from './movieReviewsReducer';
import popularActorsReducer from './popularActorsReducer';

const rootReducer = combineReducers({
    app,
    user,
    movies,
    movieCategoryReducer,
    movieContentReducer,
    movieSearchReducer,
    favouriteMoviesReducer,
    similarMoviesReducer,
    differentMoviesListReducer,
    movieReviewsReducer,
    popularActorsReducer
});

export default rootReducer;
