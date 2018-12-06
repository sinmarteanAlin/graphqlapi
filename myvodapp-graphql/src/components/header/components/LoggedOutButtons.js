import React from 'react';
import LinkHeader from '../../widgets/linkHeader/LinkHeader';

const LoggedInButtons = (props) => {
    return (
        <ul className={props.className} onClick={props.onClick} >
            <LinkHeader link='/login' btnText='Login' />
            <LinkHeader link="/register" btnText="Register" />
        </ul>
    );
}

export default LoggedInButtons;
