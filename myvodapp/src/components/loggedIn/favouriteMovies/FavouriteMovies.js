import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageTitle from '../../widgets/pageTitle/PageTitle';
import Card from '../../widgets/card/Card';
import { getFavouriteMoviesFromUser } from '../../../actions/userDataActions';

class FavouriteMovies extends Component {
    constructor(props) {
        super(props);
        if (!this.props.favouriteMovies.favouriteMoviesId) {
            this.props.getFavouriteMoviesFromUser();
        }
    }

    populateMovieContent = () => {
        const container = [];
        const {
            favouriteMoviesId,
            favouriteMoviesTitle,
            favouriteMoviesDate,
            favouriteMoviesOverview,
            favouriteMoviesPoster
        } = this.props.favouriteMovies;

        for (let i = 0; i < favouriteMoviesId.length; i++) {
            container.push (
                <Card
                    horizontalCard={true}
                    key={favouriteMoviesId[i]}
                    original_title={favouriteMoviesTitle[i]}
                    release_date={favouriteMoviesDate[i]}
                    overview={favouriteMoviesOverview[i]}
                    poster_path={favouriteMoviesPoster[i]}
                    onClick={() => {this.handleClick(favouriteMoviesId[i])}}
                />
            )
        };
        return container;
    }

    handleClick = (movieId) => {
        this.context.router.push("/movie/" + movieId);
    }

    render() {
        if (this.props.favouriteMovies.favouriteMoviesId) {
            return (
                <div className="container-fluid">
                    <PageTitle title="These are the movies you enjoyed the most!" />
                    <div className="row">
                        {this.populateMovieContent()}
                    </div>
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

FavouriteMovies.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFavouriteMoviesFromUser: getFavouriteMoviesFromUser,
    }, dispatch);
}

export default connect(state => ({
    favouriteMovies: state.favouriteMoviesReducer
}), mapDispatchToProps)(FavouriteMovies);
