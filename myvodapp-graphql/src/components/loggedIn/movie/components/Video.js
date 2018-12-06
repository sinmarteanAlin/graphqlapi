import React from "react";

const Video = (props) => {
    const url = "https://www.youtube.com/embed/" + props.video_key;
    return (
        <iframe src={url}></iframe>
    );
}

export default Video;
