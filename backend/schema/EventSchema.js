import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new Schema (
    {
        id: {type: Number},
        title: {type: String},
        date: {type: String},
        recurring: {type: Number},
        category: {type: [String]},
        zoomLink: {type: String},
    },
    { collection: "events" }
);

export default mongoose.model("event", EventSchema);
