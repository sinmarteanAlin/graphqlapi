import React from "react";

const ErrorMessageWidget = (props) => {
    return (
        <div className="alert-danger">
            {props.error.map((err, index) => {
                let message = err;
                if (index < props.error.length -1) {
                    message += '!';
                }
                return (
                    <p key={`error-${index}`}>
                        {message}
                    </p>
                );
            })}
        </div>
    );
}

export default ErrorMessageWidget;
