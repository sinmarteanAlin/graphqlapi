import React from "react";

const Header = (props) => {
    return (
        <div className="movie-header-container">
            <div className="movie-img-container"><img src={props.poster_path} alt="movie"/></div>
            <div className="movie-text-container">
                <h2 className="movie-title">{props.title} ({props.release_date})</h2>
                <h5 className="overview-post-title">Overview</h5>
                <div className="movie-overview-container">
                    {props.overview}
                </div>
            </div>
        </div>
    );
};

export default Header;
