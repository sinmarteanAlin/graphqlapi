import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../widgets/card/Card';
import PageTitle from '../../widgets/pageTitle/PageTitle';

import { getPopularActorsAction } from '../../../actions/movieActions';

class Actors extends Component {
    constructor(props) {
        super(props);
        this.props.getPopularActorsAction();
    }

    insertCategoryCards() {
        const container = [];
        Object.values(this.props.popularActorsReducer.results).map((movie) => {
            container.push(
                <Card
                    horizontalCard={false}
                    key={movie.id}
                    title={movie.name}
                    imageSrc={`https://image.tmdb.org/t/p/w470_and_h470_face${movie.profile_path}`}
                    onClick={() => {this.onClick(movie.id)}}
                />
            );
            return container;
        });
        return container;
    }

    onClick(categoryId) {
        //this.context.router.push("category/" + categoryId);
    }

    render() {
        if (this.props.popularActorsReducer.results) {
            return (
                <div>
                    <PageTitle title="Popular actors:" />

                    <div className="container">
                        <div className="row home-page-collection">
                            {this.insertCategoryCards()}
                        </div>
                    </div>
                </div>
            );
        }  else {
            return (
                <div>actors</div>
            );
        }
    }
}

Actors.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPopularActorsAction
    }, dispatch);
}

export default connect(state => ({
    popularActorsReducer: state.popularActorsReducer
}), mapDispatchToProps)(Actors);
