import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  insertMoviesContainer  from '../../../common/js/insertMoviesContainer';
import { getMovieReviewsAction } from '../../../../actions/movieActions';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.routeId = props.routeParams.id;
        this.props.getMovieReviewsAction(this.routeId);
    }

    render() {
        if (this.props.movieReviews) {
            return (
                <div className="container-fluid">
                    <h3 className="section-title margin-top-section white-text">All reviews from the movie:</h3>
                    <div className="row">
                        {insertMoviesContainer(this.props.movieReviews, null, null, 1)}
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        movieReviews: state.movieReviewsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieReviewsAction
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
