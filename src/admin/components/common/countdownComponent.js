import React, { Fragment } from 'react';
import Countdown from 'react-countdown-now';

const CountdownComponent = () => {

    const Completionist = () => <span>You are good to go!</span>;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state
                return <Completionist />;
            } else {
                // Render a countdown
                return <div className="countdown">
                    <ul>
                        <li><span id="days" className="time digits">{days}</span><span
                            className="title">days</span></li>
                        <li><span id="hours" className="time digits">{hours}</span><span
                            className="title">Hours</span></li>
                        <li><span id="minutes" className="time digits">{minutes}</span><span
                            className="title">Minutes</span></li>
                        <li><span id="seconds" className="time digits">{seconds}</span><span
                            className="title">Seconds</span></li>
                    </ul>
                </div>;
            }
        };

        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var coundown = new Date(year , month, day+10).getTime();

    return (
        <Fragment>
             <Countdown date={coundown} renderer={renderer} />
        </Fragment>
    );
};

export default CountdownComponent;