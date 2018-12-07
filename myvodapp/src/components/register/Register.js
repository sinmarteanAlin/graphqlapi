import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from 'lodash/get';
import "../common/css/formStyle.css";
import RegisterForm from "./RegisterForm";
import validateField from "../common/js/validateField";
import { registerAUser } from "../../actions/userDataActions";
import PageTitle from "../widgets/pageTitle/PageTitle";
import ErrorMessageWidget from "../widgets/errorMessage/ErrorMessageWidget";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            repassword: "",
            validUser: "",
            validEmail: "",
            validPassword: "",
            validRepassword: "",
            error: []
        };
    }

    handleRegister = () => {
        const {
            username,
            email,
            password,
            repassword
        } = this.state;

        let isValidUser = validateField(username, /^[0-9a-zA-Z_.-]+$/);
        let isValidEmail = validateField(email, /\S+@\S+\.\S+/);
        let isValidPassword = validateField(password, /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/);
        let isValidRePassword = validateField(repassword, /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/);

        this.setState({
            validUser: isValidUser,
            validEmail: isValidEmail,
            validPassword: isValidPassword,
            validRepassword: isValidRePassword
        });


        if (isValidUser && isValidEmail && isValidPassword && isValidRePassword) {
            this.props.registerAUser(
                username,
                email,
                password,
                repassword,
                () => {
                    // success
                    this.context.router.push("home");
                },
                (err) => {
                    // error
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
        })
    };

    render() {
        const {
            username,
            email,
            password,
            repassword,
            validUser,
            validEmail,
            validPassword,
            validRepassword,
            error
        } = this.state;

        return (
            <div>
                <PageTitle title="Make a new account" />

                <RegisterForm
                    onRegisterButtonClick={this.handleRegister}
                    username={username}
                    email={email}
                    password={password}
                    repassword={repassword}
                    handleChange={this.handleChange}
                    validUser={validUser}
                    validEmail={validEmail}
                    validPassword={validPassword}
                    validRepassword={validRepassword}
                />

                {error.length > 0 && <ErrorMessageWidget error={error} />}
            </div>
        );
    }
};

Register.contextTypes = {
    router: PropTypes.object
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerAUser: registerAUser,
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Register);
