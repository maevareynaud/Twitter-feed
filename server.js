const { createServer } = require("http")
const fs = require("fs/promises")
const ws = require("ws")

const server = createServer()

server.on("request", async (request, response) => {
  const co = await console.log("on request", request.method, request.url)

  if (request.url === "/") {
    const file = await fs.readFile("./index.html", "utf8")
    response.writeHead(200)
    response.end(file)
  } else {
    response.writeHead(404)
    response.end()
  }
})


module.exports = server