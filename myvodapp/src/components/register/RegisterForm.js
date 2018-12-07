import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Input from "../widgets/input/Input";
import Button from "../widgets/button/Button";

const RegisterForm = (props) => {
    return (
        <form className="bootstrap-form">
            <Input
                labelFor="username-register"
                labelText="Username"
                inputType="text"
                inputId="username-register"
                inputPlaceholder="Enter username"
                value={props.username}
                name="username"
                handleChange={props.handleChange}
                validUser={props.validUser}
            />

            <Input
                labelFor="email-register"
                labelText="Email Address"
                inputType="text"
                inputId="email-register"
                inputPlaceholder="Enter email address"
                value={props.email}
                name="email"
                handleChange={props.handleChange}
                validEmail={props.validEmail}
            />

            <Input
                labelFor="password-register"
                labelText="Password"
                inputType="password"
                inputId="password-register"
                inputPlaceholder="Enter password"
                value={props.password}
                name="password"
                handleChange={props.handleChange}
                validPassword={props.validPassword}
            />

            <Input
                labelFor="repassword-register"
                labelText="Repeat Password"
                inputType="password"
                inputId="repassword-register"
                inputPlaceholder="Repeat password"
                value={props.repassword}
                name="repassword"
                handleChange={props.handleChange}
                validPassword={props.validRepassword}
            />

            <Button
                btnText={"Register"}
                onClickHandler={props.onRegisterButtonClick}
            />
        </form>
    );
}

export default RegisterForm;
