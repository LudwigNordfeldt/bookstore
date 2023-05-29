const express = require("express");

const bookRouter = require("./controllers/books")
const userRouter = require("./controllers/users")

const mongoose = require("mongoose");

const cors = require("cors")

require("dotenv").config();

const app = express();

const dburl = process.env.mongo
mongoose.connect(dburl)

app.use(express.static("build"));

app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use("/books", bookRouter)
app.use("/users", userRouter)

module.exports = app;
