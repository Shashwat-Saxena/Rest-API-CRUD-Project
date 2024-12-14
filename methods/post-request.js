const crypto = require("crypto");
const writeToFile = require("../util/write-to-file");
const requestBodyParser = require("../util/Body-parser");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-type": "application/json" });

      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request Body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
