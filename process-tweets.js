const { Writable, Transform } = require("stream")

function getTweetFromSource(broadcaster) {
  // create a new source stream for each client
  const tweetSource = new Readable({
    objectMode: true,
    read() { }
  })

  // data event callback
  function pushToSource(chunk) {
    tweetSource.push(chunk)
  }

  // listen to new data from main pipeline and push it to client stream
  broadcaster.on("data", pushToSource)

  // remove event listener if error, emitted from client pipeline
  tweetSource.on("error", () => {
    broadcaster.off("data", pushToSource)
  })

  return tweetSource
}

const jsonParser = new Transform({
  readableObjectMode: true,

  transform(chunk, _, callback) {
    let data = {}
    try {
      data = JSON.parse(chunk)
    } catch (error) {

    }
    this.push(data)
    callback()
  }
})

const typeExtractor = new Transform({
  writableObjectMode: true,

  transform(chunk, _, callback) {
      let text
      try {
          text = chunk.data.text
          console.log(chunk)
          this.push(text)
      } catch (error) {
      }
      callback()
  }
})




module.exports = {
  jsonParser,
  typeExtractor,
  getTweetFromSource
}