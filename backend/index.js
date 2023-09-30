// const bodyParser = require("body-parser");
// const express = require("express");
// const mongoose = require("mongoose");
// const HttpError = require("./modals/http-error");

// const app = express();

// const eventrouter = require("./routes/router_events");
// const userrouter = require("./routes/router_users");


// app.use(bodyParser.json());
// app.use("/api/users", userrouter);
// app.use("/api/events", eventrouter);

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route', 404);
//     throw error;
// })   //this is a middleware function. it will only execute if we have a request that reaches this line of code. if we have a request that reaches this line of code and we did not send a response in the previous middleware function then this middleware function will execute.

// app.use((error, req, res, next) => {
//     if (res.headerSent) {
//         return next(error); ///this mean shit turned out
//     }
//     res.status(error.code || 500)
//     res.json({ message: error.message || 'An unknown error occurred!' });
// });

// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(()=>{
//         app.listen(3000);
//     })
//     .catch(err => {
//         console.log(err);
//     });

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

require("dotenv").config();

const eventrouter = require("./routes/router_events");
const userrouter = require("./routes/router_users");
const URI = "mongodb+srv://hhong:11313Eagle@cluster0.ya35cje.mongodb.net/";
console.log(process.env.MONGODB_URI);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api", userrouter);
app.use("/api", eventrouter);

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://hhong:11313Eagle@cluster0.ya35cje.mongodb.net/";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const eventRouter = require("./routes/router_events");
const usersRouter = require("./routes/router_users");

app.use("/events", eventRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
