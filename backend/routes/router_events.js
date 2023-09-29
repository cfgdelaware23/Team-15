import {Request, Response, Router} from "express";
import EventSchema from "../schema/Event";

const events = Router();

events.post("/create-event", async (Request, Response) => {
    const { id, title, date, recurring, category, zoomLink } = Request.body;
    const eventDB = await EventSchema.findOne({ id: id });

    if (eventDB) {
        Response.status(400).send("Event already exists!");
        return;
    }

    const event = EventSchema.create({

    });
    event.save();
})

export default events;