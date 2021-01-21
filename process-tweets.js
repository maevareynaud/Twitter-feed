const { Writable, Transform } = require("stream")

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
  typeExtractor
}