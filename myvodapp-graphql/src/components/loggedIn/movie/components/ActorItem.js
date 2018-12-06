import React from "react";

const ActorItem = (props) => {
    return (
        <li>
            <img src={props.profile_path} alt="Actor Item"/>
            <div className="item-text">
                <h5>{props.name}</h5>
                <p>{props.character}</p>
            </div>
        </li>
    );

}
export default ActorItem;
