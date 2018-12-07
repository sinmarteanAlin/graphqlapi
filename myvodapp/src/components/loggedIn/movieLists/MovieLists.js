import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PageTitle from "../../widgets/pageTitle/PageTitle";
import CategoryFilter from './components/CategoryFilter';
import { getDifferentMoviesListsAction } from '../../../actions/movieActions';
import insertMoviesContainer from '../../common/js/insertMoviesContainer';
import './css/style.css';

class MovieLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: 'popular'
        };
        this.props.getDifferentMoviesListsAction('popular');
    };

    handleSelectChange = (event) => {
        this.setState({
            selectValue: event.target.value
        }, () => {
            const { selectValue } = this.state;
            this.props.getDifferentMoviesListsAction(selectValue);
        });
    };

    onClick = (movieId) => {
        this.context.router.push("/movie/" + movieId);
    }

    render() {
        if (this.props.getDifferentMoviesLists.results) {
            return (
                <div>
                    <PageTitle title="Browse through our amazing movie lists"/>
                    <CategoryFilter
                        selectValue={this.state.selectValue}
                        handleSelectChange={this.handleSelectChange}
                    />

                    <div className="container-fluid">
                        <div className="row">
                            {insertMoviesContainer(this.props.getDifferentMoviesLists.results, this.onClick, 1)}
                        </div>
                    </div>

                </div>
            );
        } else {
            return (<div></div>)
        }
    };
}

MovieLists.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        getDifferentMoviesLists: state.differentMoviesListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDifferentMoviesListsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieLists);
