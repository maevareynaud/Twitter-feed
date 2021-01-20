const { Writable, Readable, pipeline, Transform } = require("stream")

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

const userDetails = new Transform({
  objectMode: true,
  transform(chunk, _, callback) {
    let content
    try {
      //name = chunk.includes.users[0].name
      //followers = chunk.includes.users[0].public_metrics
      content = chunk.data
      if( content.includes('trump') || content.includes('Donald Trump')){
      }
    } catch (error) {
      
    }
    this.push(content)
    callback()
  } 
})

const logger = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    try {
      //console.log(JSON.stringify(chunk))
    } catch (err) {
      // 
    }
    callback()
  }
})

module.exports = {
  jsonParser,
  userDetails,
  logger
}