//import express from "express";

const bodyParser = require("body-parser");
const express = require("express");
const PORT = 80;
const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log("connected") })
    .catch((err) => { console.log(err) });

app.use('/api', router2);
app.use('/api', router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));