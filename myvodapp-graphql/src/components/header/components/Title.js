import React from "react";
import {IndexLink} from "react-router";

const Title = (props) => {
    return (
        <div className="left-side-header">
            <span onClick={props.onClick}>
                <IndexLink to="/" activeClassName="active">
                    <i>My VoD App</i>
                </IndexLink>
            </span>
        </div>
    );
};

export default Title;
