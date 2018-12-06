import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style/style.css';
import Title from './components/Title';
import MenuWidget from './components/MenuWidget';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import LoggedInButtons from './components/LoggedInButtons';
import LoggedOutButtons from './components/LoggedOutButtons';
import { logoutAUser } from '../../actions/userDataActions';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            addedClasses: 'dynamicHeader',
            menuClasses: 'openMenu headerOpen'
        };
    }

    handleRightSideButtons = () => {
        let container;
        if (this.props.isLoggedIn === true) {
            container = <LoggedInButtons
                className={this.state.menuClasses}
                onClick={() => this.changeBarAnimation(1)}
                handleLogoutClick={this.handleLogoutClick}
                />
        } else {
            container = <LoggedOutButtons
                className={this.state.menuClasses}
                onClick={() => this.changeBarAnimation(1)}
            />
        }
        return container;
    }

    changeBarAnimation = (onlyCloseOption) => {
        var addedClasses = 'dynamicHeader';
        var menuClasses = 'openMenu headerOpen';

        //in some cases we only need to close the menu, not to toggle it, ex: click on home menu when widget is open, click on close menu when widget is open
        if (onlyCloseOption) {
            if (this.state.addedClasses !== 'dynamicHeader') {
                addedClasses = 'dynamicHeader';
                menuClasses = 'openMenu headerOpen';
            }
        } else {
            if (this.state.addedClasses === 'dynamicHeader') {
                addedClasses = 'dynamicHeader headerOpen';
                menuClasses = 'openMenu';
            } else {
                addedClasses = 'dynamicHeader';
                menuClasses = 'openMenu headerOpen';
            }
        }

        this.setState({
            addedClasses: addedClasses,
            menuClasses: menuClasses
        });
    }

    handleLogoutClick = () => {
        this.props.logoutUser(() => {
            this.context.router.push("/");
        });
    }

    render() {
        return (
            <div className="container-fluid header-full-width">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-5 col-5 left-side-div">
                        <Title
                            onClick={() => this.changeBarAnimation(1)}
                        />
                    </div>
                    <MenuWidget
                        className={this.state.addedClasses}
                        onClick={() => this.changeBarAnimation()}
                    />
                </div>
                <div className="row">
                    {this.handleRightSideButtons()}
                </div>
            </div>
        )
    }
}

Header.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser: logoutAUser}, dispatch);
}

export default connect(state => ({
    isLoggedIn: state.user.isLoggedIn
}), mapDispatchToProps)(Header);
