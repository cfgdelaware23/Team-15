import React from "react"



export default function Note(props) {
    return (
        <div className="note">
            <h1 className="firstnamenote">{props.firstname}</h1>
            <h1 className="lastnamenote">{props.lastname}</h1>
            <h1 className="problemnote">{props.problem}</h1>
            <h1 className="answernote">{props.answer}</h1>
        </div>

    )

}
