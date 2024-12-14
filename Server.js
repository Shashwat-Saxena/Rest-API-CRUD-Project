const http = require("http");
const getReq = require("./methods/get-request");
const PostReq = require("./methods/post-request");
const PutReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");

const { title } = require("process");
// require("dotenv").config();
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;

    case "POST":
      PostReq(req, res);
      break;

    case "PUT":
      PutReq(req, res);
      break;

    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      req.setHeader("content-type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
});
server.listen(PORT, () => {
  console.log(`server started on port :${PORT}`);
});
