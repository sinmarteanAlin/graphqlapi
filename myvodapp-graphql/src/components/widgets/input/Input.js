import React from 'react';

 const Input = (props) => {
    const displayInvalidInput = () => {
        if (props.validUser === false) {
            return (
                <span>*Please enter a valid username.</span>
            );
        }

        if (props.validEmail === false) {
            return (
                <span>*Please enter a valid Email address.</span>
            );
        }

        if (props.validPassword === false) {
            return (
                <span>*Please enter a valid password, which is at least 8 characters long, includes at least a lowercase letter, 1 capital letter, 1 number and 1 special character </span>
            );
        }

        if (props.validRepassword === false) {
            return (
                <span>*Please enter a valid password, which is at least 8 characters long, includes at least a lowercase letter, 1 capital letter, 1 number and 1 special character </span>
            );
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={props.labelFor}>{props.labelText}</label>
            <input
                type={props.inputType}
                className="form-control"
                id={props.inputId}
                placeholder={props.inputPlaceholder}
                value={props.value}
                name={props.name}
                onChange={props.handleChange}
            />
            <span className="bootstrap-form-error">{displayInvalidInput()}</span>
        </div>
    );
};
export default Input;
