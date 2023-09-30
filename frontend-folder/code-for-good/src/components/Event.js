import React from "react";
import "../styles/Event.css";

function Event(props) {
    return <div className="eventCard">
        <div className="titleCard" id="title">{props.title}</div>
        <div className="categories">{props.categories}</div>
        <div className="date">{props.date}</div>
    </div>;
}

export default Event;