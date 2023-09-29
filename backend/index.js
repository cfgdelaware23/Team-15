import userrouter from "./routes/router_users";
import events from "./routes/router_events";


const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const HttpError = require("./modals/http-error");

const eventrouter = require("./routes/router_events");
const userrouter = require("./routes/router_users");


app.use(bodyParser.json());
app.use("/api/users", userrouter);
app.use("/api/events", eventrouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})   //this is a middleware function. it will only execute if we have a request that reaches this line of code. if we have a request that reaches this line of code and we did not send a response in the previous middleware function then this middleware function will execute.

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error); ///this mean shit turned out
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });