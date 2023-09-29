const express = require('express');
const EventSchema = require('../schema/EventSchema.js');
const events = express.Router();

events.post("/create-event", async (Request, Response) => {
    const { id, title, date, recurring, category, zoomLink } = Request.body;

    const event = EventSchema.create({
        title: title,
        date: date,
        recurring: recurring,
        category: category,
        zoomLink: zoomLink
    });
    event.save();

    Response.status(201).json("New user created");
})

module.exports = events;