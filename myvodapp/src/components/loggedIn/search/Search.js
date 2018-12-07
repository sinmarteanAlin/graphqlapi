import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import PageTitle from '../../widgets/pageTitle/PageTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAMovie } from '../../../actions/movieActions';
import SearchInput from './components/SearchInput';
import Card from '../../widgets/card/Card';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            assets: [],
            fetching: false,
            searched: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.movies !== this.props.movies
            || nextState.fetching !== this.state.fetching
            || nextState.assets !== this.state.assets
            || nextState.search !== this.state.search
            || nextState.search.length > 2
        ) {
            return true;
        }
        return false;
    }

    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.search !== this.state.search
            && nextState.search.length > 2
        ) {
            this.setState({
                fetching: true
            }, () => {
                setTimeout(() => {
                    if (this.state.search === nextState.search) {
                        this.fetchAssets(nextState.search);
                   }
               }, 500);
            });
        } else if (nextState.search.length < 3 && this.state.assets.length) {
            this.setState({ assets: [] });
        } else if (
            this.state.fetching !== nextState.fetching
            && this.state.fetching
            && !nextState.fetching
        ) {
            if (!nextProps.movies.length) {
                this.setState({ assets: [] });
            } else if (nextProps.movies.length) {
                this.setState({
                    assets: this.extractAssets()
                });
            }
        }
    }

    extractAssets = () => {
        const {
            movies = []
        } = this.props;
        return movies.map(movie => ({
            ...movie,
            poster_path: `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`
        }));
    };

    fetchAssets = (query) => {
        this.props.searchAMovie(query, () => this.setState({ fetching: false, searched : true }));
    };

    insertCard = () => {
        if (this.state.assets.length > 0) {
            const container = [];
            const {
                assets = []
            } = this.state;
            assets.forEach((movie, index) => {
                container.push(
                    <Card
                        horizontalCard={true}
                        key={`asset-${get(movie, 'id', index)}`}
                        title={get(movie, 'original_title', '')}
                        release_date={get(movie, 'release_date', '')}
                        overview={get(movie, 'overview', '')}
                        imageSrc={get(movie, 'poster_path')}
                        onClick={() => {this.onClick(get(movie, 'id', index))}}
                    />
                )
            });
            return container;
        }
        return null;
    }

    onClick(movieId) {
        this.context.router.push("/movie/" + movieId);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {
            assets = [],
            searched
        } = this.state;

        if (this.props.categories !== null) {
            return (
                <div>
                    <PageTitle title="Search the movie you want" />
                    <SearchInput
                        search={this.state.search}
                        handleChange={this.handleChange}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            {assets.length > 0 && this.insertCard()}
                            {assets.length === 0 && (
                                <div>
                                    {searched && 'No results found!'}
                                    {!searched && ''}
                                </div>
                            )}
                        </div>
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

Search.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchAMovie: searchAMovie
    }, dispatch);
}

export default connect(state => ({
    movies: state.movieSearchReducer
}), mapDispatchToProps)(Search);
