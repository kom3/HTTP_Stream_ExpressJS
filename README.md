# HTTP_Stream_ExpressJS
Streaming file data from expressJS sever and consuming the same in FE using fetch API

## Server Side Code:
```
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

```

## Client side code:

```
// Cosuming the data stream using the fetch API
  fetch("http://localhost:3000/").then(async (response) => {
    const reader = response.body.getReader();
    let progress = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decoder = new TextDecoder();
      let chunk = decoder.decode(value)
      console.log("Chunk...", chunk)
     }
  });
```
