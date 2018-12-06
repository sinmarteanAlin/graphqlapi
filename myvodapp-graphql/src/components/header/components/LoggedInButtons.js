import React from 'react';
import LinkHeader from '../../widgets/linkHeader/LinkHeader';


const LoggedInButtons = (props) => {
    return (
        <ul className={props.className} onClick={props.onClick} >
            <LinkHeader link='/home' btnText='Movies' />
            <LinkHeader link='/actors' btnText='Popular Actors' />
            <LinkHeader link='/movie-lists' btnText='Different Movie lists' />
            <LinkHeader link="/favourite-movies" btnText="Favourite Movies" />
            <LinkHeader link="/search" btnText="Search" />
            <li onClick={props.handleLogoutClick}><a href="#">Logout</a></li>
        </ul>
    );
}

export default LoggedInButtons;
