import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../common/css/formStyle.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from 'lodash/get';
import LoginForm from "./LoginForm";
import validateField from "../common/js/validateField";
import { loginAUser } from "../../actions/userDataActions";
import PageTitle from "../widgets/pageTitle/PageTitle";
import ErrorMessageWidget from "../widgets/errorMessage/ErrorMessageWidget";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            validUser: "",
            validPassword: "",
            error: []
        };
    }

    handleLogin = () => {
        const {
            username,
            password
        } = this.state;

        let isValidUser = validateField(username, /^[0-9a-zA-Z_.-]+$/);
        let isValidPassword = validateField(password, /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/);

        this.setState({
            validUser: isValidUser,
            validPassword: isValidPassword
        });

        if (isValidUser && isValidPassword) {
            this.props.loginAUser(
                username,
                password,
                () => {
                    this.context.router.push("home");
                },
                (err) => {
                    if (err) {
                        this.setState({
                            error: get(err, 'message', '').split('! ')
                        });
                    }
                }
            );
        }
    };

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            username,
            password,
            validUser,
            validPassword,
            error
        } = this.state;

        return (
            <div>
                <PageTitle title="Log In to your account" />
                <LoginForm
                    onLoginSubmit={this.handleLogin}
                    username={username}
                    password={password}
                    handleChange={this.handleChange}
                    validUser={validUser}
                    validPassword={validPassword}
                />

                {error.length > 0 && <ErrorMessageWidget error={error} />}
            </div>
        );
    }
};

Login.contextTypes = {
    router: PropTypes.object
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loginAUser
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Login);
