import React from "react";

const Favourite = (props) => {
    const dynamicText = () => {
        let text;
        (props.isFavourite === true) ? text = "Remove from favourite" : text = 'Add to favourites';
        return text;
    }

    return (
        <div className="section-title white-text favourite-video">
            <h3 onClick={props.handleClick}>{dynamicText()}</h3>
        </div>
    )
}

export default Favourite;
