const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Import routes
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

//DB Connection;
mongoose.connect(process.env.DB_CONNECTION, () => console.log("db connected"));

//Start listening
app.listen(5000, () => console.log("listening on 5000"));
