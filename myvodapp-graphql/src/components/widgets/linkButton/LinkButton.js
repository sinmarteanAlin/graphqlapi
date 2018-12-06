import React from 'react';
import { Link } from 'react-router';
import Button from '../button/Button';

const LinkButton = (props) => {
    return (
        <Link to={props.link} activeClassName="active">
            <Button btnText={props.btnText} />
        </Link>
    )
}
export default LinkButton;
