import {Request, Response, Router} from "express";
import getPostModel from "../schema/Event";

const events = Router();

events.post("/create-event", async (Request, Response) => {
    const { id, title, date, recurring, category, zoomLink } = req.body;
    const eventDB = await UserModel.findOne({ id: user._id });
})

export default events;