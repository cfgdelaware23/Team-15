//import users from "./routes/router_users";
//import events from "./routes/router_events";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(bodyParser.json());
app.use('/api', users);
app.use('/api', events);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });