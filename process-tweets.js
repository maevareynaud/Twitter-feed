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

/*const textSelector = new Transform({
  objectMode: true,

  transform(chunk, _, callback) {
      try {
          if(chunk.includes('dicaprio')){
            console.log('trump')
            const tweetPerson = {
              person: 'trump',
              text: chunk.toString()
            }

            const tweetSorter = JSON.stringify(tweetPerson)
            this.push(tweetSorter)
          }

          
          
      } catch (error) {
      }

      callback()
  }
})*/


const tweetCounter = new Transform({
  writableObjectMode: true,

  transform(chunk, _, callback) {

    console.log(chunk.matching_rules[0].tag)

    if(chunk.matching_rules[0]){
      switch(chunk.matching_rules[0].tag){
        case 'dicaprio' :
          console.log('trump')
          break;
        case 'jul' :
          console.log('jul')
          break;
        default : 
          console.log('simple')
      }
  
    }
    
    this.counter ++
    
    this.push(this.counter.toString())
    
    callback()
  }
})




const logger = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    try {
      console.log(JSON.stringify(chunk))
    } catch (err) {
      // 
    }
    callback()
  }
})


module.exports = {
  jsonParser,
  typeExtractor,
  logger,
  tweetCounter
}