import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import PageTitle from "../../widgets/pageTitle/PageTitle";
import { getMovieGenreDetails } from '../../../actions/movieActions';
import insertMoviesContainer from '../../common/js/insertMoviesContainer';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

class Category extends Component {
    constructor(props) {
        super(props);
        this.props.getMovieGenreDetails(props.routeParams.id);
    }

    onClick = (movieId) => {
        this.context.router.push("/movie/" + movieId);
    }

    render() {
        if (this.props.movieCategoriesUnchanged !== null) {
            return (
                <div>
                    <PageTitle title="Check out all the movies from this category"/>

                    <div className="container-fluid">
                        <div className="row">
                            {insertMoviesContainer(this.props.movieCategoriesUnchanged, this.onClick)}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

Category.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        movieCategories: state.movies,
        movieCategoriesUnchanged: state.movies
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenreDetails: getMovieGenreDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
