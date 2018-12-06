import React, { Component } from "react";
import { connect } from "react-redux";
import ActorItem from "./ActorItem";
import { bindActionCreators } from "redux";
import { getMovieDetailsAction } from '../../../../actions/movieActions';

class FullCastAndCrew extends Component {
    constructor(props) {
        super(props);

        if (!this.props.movieContent) {
            this.props.getMovieDetailsAction(props.routeParams.id);
        }
    }

    returnNumberOfCastOrCrew(option) {
        if (option === 0) {
            return this.props.movieContent.credits.cast.length;
        }
        return this.props.movieContent.credits.crew.length;
    }

    generateActorItems(crew) {
        //initially we display cast.if crew = true, we display crew
        const container = [];
        var credits = this.props.movieContent.credits.cast;

        if (crew) {
            credits = this.props.movieContent.credits.crew;
        }

        credits.map((cast) => {
            container.push(
                <ActorItem
                    name={cast.name}
                    character={crew ? cast.job : cast.character}
                    profile_path={(cast.profile_path.indexOf("facenull") > -1) ? "/blank-photo.png" : cast.profile_path}
                />
            )
            return container;
        })
        return container;
    }

    generateColumnTemplate = (option) => {
        return (
            <div className="column">
                <h4>Cast ({this.returnNumberOfCastOrCrew(option)})</h4>
                <ul className="actor-item-list">
                    {this.generateActorItems(option)}
                </ul>
            </div>
        );
    };

    render() {
        if (this.props.movieContent !== null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.generateColumnTemplate(0)}
                        {this.generateColumnTemplate(1)}
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

function mapStateToProps(state) {
    return {
        movieContent: state.movieContentReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieDetailsAction: getMovieDetailsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FullCastAndCrew);
