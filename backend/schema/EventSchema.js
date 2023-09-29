import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new Schema (
    {
        title: {type: String},
        date: {type: String},
        recurring: {type: Boolean},
        interests: {type: String},
        zoomLink: {type: String}
    },
    { collection: "events" }
);

function getEventModel() {
  if ("event" in mongoose.models) return mongoose.models.Event;
  return mongoose.model("event", PostSchema);
}
export default getPostModel;
