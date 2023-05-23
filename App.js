const express = require("express");
const axios = require("axios");

const app = express();
const baseUrl = "https://openlibrary.org/"

app.use(express.static("build"))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/books/:request/:subrequest", async (req, res) => {
  const query = req.query
  const reqType = req.params.request.concat("/", req.params.subrequest, ".json")
  let queryUrl = "?"

  for (const [key, value] of Object.entries(query)) {
    queryUrl = queryUrl.concat(key, "=", value, "&")
  }

  const response = await axios.get(baseUrl.concat(reqType, queryUrl))
  res.send(response.data)
});

app.get("/books/:request", async (req, res) => {
  const query = req.query
  const reqType = req.params.request.concat(".json")
  let queryUrl = "?"

  for (const [key, value] of Object.entries(query)) {
    queryUrl = queryUrl.concat(key, "=", value, "&")
  }

  console.log("REQUEST GOING TO:", baseUrl.concat(reqType, queryUrl))
  const response = await axios.get(baseUrl.concat(reqType, queryUrl))
  res.send(response.data)
})

module.exports = app;