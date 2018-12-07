import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import LoadingWidget from './widgets/loading/LoadingWidget';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.isFetching && (
                    <LoadingWidget />
                )}
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default connect(state => ({
    isFetching: state.app.isFetching,
    isLoggedIn: state.user.isLoggedIn
}))(App);
