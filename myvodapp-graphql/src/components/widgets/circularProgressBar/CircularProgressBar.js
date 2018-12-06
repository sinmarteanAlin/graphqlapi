import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import './css/style.css';

const CircularProgressBar = (props) => {
    return (
        <div className="circular-progress-bar">
            <CircularProgressbar
                percentage={props.value * 10}
                text={`${props.value * 10}%`}
                background
                backgroundPadding={0}
                strokeWidth={11}
                styles={{
                    background: {
                        fill: '#081c22',
                    },
                    text: {
                        fill: '#fff',
                        fontSize: '23px',
                        fontWeight: 'bold'
                    },
                    path: {
                        stroke: '#01D277',
                    },
                    trail: { stroke: '#1C402E' },

                }}
            />
        </div>
    );
}

export default CircularProgressBar;
