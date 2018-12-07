import React from 'react';
import { Link } from 'react-router';

const LinkButton = (props) => {
    return (
        <li>
            <Link to={props.link} activeClassName="active">
                {props.btnText}
            </Link>
        </li>
    )
}

export default LinkButton;
