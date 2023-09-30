const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema (
    {
        title: {type: String},
        date: {type: String},
        recurring: {type: Number},
        category: {type: [String]},
        zoomLink: {type: String},
    },
    { collection: "events" }
);

module.exports = mongoose.model("event", EventSchema);

// export default mongoose.model("event", EventSchema);
