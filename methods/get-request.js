module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  // console.log(baseUrl);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/[a-zA-Z]+/g);
  // console.log(first)
  // console.log(id)
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.setHeader("content-type", "application/json");
    let filterdMovies = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filterdMovies.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filterdMovies));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
