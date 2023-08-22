const express = require("express");
const fs = require("node:fs");

const app = express();

app.get("/", (req, res) => {
  // required headers to stream the data
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Conection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Transfer-Encoding", "chunked");

  //   creating a readable stream
  const readableStream = fs.createReadStream("./test.txt", {
    encoding: "utf-8",
    highWaterMark: 1,
  });

  //   pipelining the readable stream into response
  readableStream.pipe(res);
});

app.listen("3000");
