import React from "react";
import './css/style.css';
import CircularProgressBar from '../circularProgressBar/CircularProgressBar';

const Card = (props) => {
    if (!props.isReview) {
        if (props.horizontalCard === true) {
            return (
                <div className="col-sm-12 col-md-12 col-lg-6 margin-bottom h-100">
                    <div className="card flex-row" onClick={props.onClick}>
                        <div className="border-0">
                            <img className="card-img-top-category" src={props.imageSrc} alt="" />
                        </div>
                        <div className="card-block px-2 category-card">
                            <h4 className="card-title-left">{props.title}</h4>
                            <p className="card-release-date">{props.release_date}</p>
                            <p className="card-text">{props.overview}</p>
                        </div>
                        <div className="card-block px-2">
                            <CircularProgressBar
                                value={props.vote_average}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-lg-3 margin-bottom-wrapper">
                    <div className="card" onClick={props.onClick}>
                        <img className="card-img-top" src={props.imageSrc} alt="Card cap"/>
                        <div className="card-body">
                            <h3 className="card-title"><i>{props.title}</i></h3>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
//<img className="card-img-top-category" src={props.poster_path} alt="" />
        return (
            <div className="col-sm-12 col-md-12 col-lg-6 margin-bottom h-100">
                <div className="card flex-row">
                    <div className="border-0">
                        <img className="card-img-top-category" src="../no-photo.png" alt="" />
                    </div>
                    <div className="card-block px-2 category-card">
                        <h4 className="card-title-left">{props.original_title}</h4>
                        <p className="card-text">{props.overview}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
