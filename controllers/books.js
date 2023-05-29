const bookRouter = require("express").Router();
const axios = require("axios")
const baseUrl = "https://openlibrary.org/";

bookRouter.get("/:request/:subrequest", async (req, res) => {
  const query = req.query;
  const reqType = req.params.request.concat(
    "/",
    req.params.subrequest,
    ".json"
  );
  let queryUrl = "?";

  for (const [key, value] of Object.entries(query)) {
    queryUrl = queryUrl.concat(key, "=", value, "&");
  }

  const response = await axios.get(baseUrl.concat(reqType, queryUrl));
  res.send(response.data);
});

bookRouter.get("/:type", async (req, res) => {
  const query = req.query;
  const reqType = req.params.type.concat(".json");
  let queryUrl = "?";

  for (const [key, value] of Object.entries(query)) {
    if (value.length) {
      queryUrl = queryUrl.concat(key, "=", value, "&");
    }
  }

  const response = await axios.get(baseUrl.concat(reqType, queryUrl));
  res.send(response.data);
});

module.exports = bookRouter;
