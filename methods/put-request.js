const writeToFile = require("../util/write-to-file");
const requestBodyParser = require("../util/Body-parser");

module.exports = async (req, res)=>{
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  // console.log(baseUrl);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/[a-zA-Z]+/g);

  if (!regexV4.test(id)) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
}else if(baseUrl === "/api/movies/" && regexV4.test(id)){
    try{
        let body = await requestBodyParser(req);
        const index = req.movies.findIndex((movie)=>{
            return movie.id === id;
        });
        if(index === -1){
            res.statusCode = 404;
            res.write(JSON.stringify({title:"Not found", message:"Movie Not found"}));
            res.end();
        }else{
            req.movies[index] = {id,...body};
            writeToFile(req.movies);
            res.writeHead(200, {"Contant-Type":"application/json"});
            res.end(JSON.stringify(req.movies[index]))
        }
    }catch(err){
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
}