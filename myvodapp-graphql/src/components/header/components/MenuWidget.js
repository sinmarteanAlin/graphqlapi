import React from 'react';

const MenuWidget = (props) => {
    return (
        <div className="col-lg-3  col-md-4 col-sm-7 col-7 right-side-div">
            <div className={props.className} onClick={props.onClick}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    );
}

export default MenuWidget;
