const bodyParser = require("body-parser");
const express = require("express");
const PORT = 80;
const app = express();
const mongoose = require("mongoose");


app.use(bodyParser.json());
app.use('/api', router2);
app.use('/api', router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });