// import {Request, Response, Router} from "express";
// import EventSchema from "../schema/EventSchema";

// const events = Router();
const express = require('express');
const EventSchema = require('../schema/EventSchema.js');
const events = express.Router();

// events.post("/create-event", async (Request, Response) => {
//     const { id, title, date, recurring, category, zoomLink } = Request.body;

//     const event = EventSchema.create({
//         title: title,
//         date: date,
//         recurring: recurring,
//         category: category,
//         zoomLink: zoomLink
//     });
//     event.save();

//     Response.status(201).json("New user created");
// })

events.post("/test", async (req, res) => {
    console.log("test");
    res.status(201);
})

// export default events;

const router = require('express').Router();
let Event = require('../schema/EventSchema');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const recurring = req.body.recurring;
    const category = req.body.category;
    const zoomLink = req.body.zoomLink;

    const newEvent = new Event({
        title,
        date,
        recurring,
        category,
        zoomLink
    });

    newEvent.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("./id").get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
}   );  

module.exports = router;
