import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../widgets/pageTitle/PageTitle';
import Card from '../../widgets/card/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovieGenres } from '../../../actions/movieActions';
import { getFavouriteMoviesFromUser } from '../../../actions/userDataActions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props.getMovieGenres();
        this.props.getFavouriteMoviesFromUser();
    }

    insertCategoryCards() {
        const container = [];
        Object.values(this.props.movieCategories).map((category) => {
            container.push(
                <Card
                    horizontalCard={false}
                    key={category.id}
                    title={category.name}
                    imageSrc={category.picture}
                    onClick={() => {this.onClick(category.id)}}
                />
            );
            return container;
        });
        return container;
    }

    onClick(categoryId) {
        this.context.router.push("category/" + categoryId);
    }

    render() {
        if (this.props.movieCategories !== null) {
            return (
                <div>
                    <PageTitle title="Browse throught our categories and choose a movie from them" />
                    <div className="container-fluid">
                        <div className="row home-page-collection">
                            {this.insertCategoryCards()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

Home.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        movieCategories: state.movieCategoryReducer,
        favouriteMovies: state.favouriteMoviesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenres,
        getFavouriteMoviesFromUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
