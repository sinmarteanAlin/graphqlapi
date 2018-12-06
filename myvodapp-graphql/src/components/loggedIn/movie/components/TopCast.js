import React from "react";

const TopCast = (props) => {
    return (
        <div key={props.id} className="cast-container white-text col-lg-2 col-md-4 col-sm-6 col-6 margin-auto" >
            <img src={props.profile_path} alt="Actor Profile"/>
            <h5>{props.name}</h5>
            <p>{props.character}</p>
        </div>
    );
}

export default TopCast;
