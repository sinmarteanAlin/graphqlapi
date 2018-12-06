import React from 'react';
import "./css/style.css";

const PageTitle = (props) => {
    return (
        <h2 className="page-title"><i>{props.title}</i></h2>
    );
};

export default PageTitle;
