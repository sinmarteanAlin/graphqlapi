import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Input from "../widgets/input/Input";
import Button from "../widgets/button/Button";

const LoginForm = (props) => {
    return (
        <form className="bootstrap-form">
            <Input
                labelFor="username-login"
                labelText="Username"
                inputType="text"
                inputId="username-login"
                inputPlaceholder="Enter username"
                value={props.username}
                name="username"
                handleChange={props.handleChange}
                validUser={props.validUser}
            />

            <Input
                labelFor="password-login"
                labelText="Password"
                inputType="password"
                inputId="password-login"
                inputPlaceholder="Enter password"
                value={props.password}
                name="password"
                handleChange={props.handleChange}
                validPassword={props.validPassword}
            />

            <Button
                btnText="Login"
                onClickHandler={props.onLoginSubmit}
            />
        </form>
    );
}
export default LoginForm;
