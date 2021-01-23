require("dotenv").config()
const { pipeline, Transform } = require("stream")
const WebSocket = require("ws")
const  server  = require("./server")
const {connectToTwitter, tweetStream} = require("./twitter")
const {jsonParser,   typeExtractor } = require("./process-tweets")
const { getSearchRules, addSearchRules, deleteSearchRules} = require('./search-rules')


// server http
server.listen(3000)
const wsServer = new WebSocket.Server({ server })

wsServer.on("connection", (client) => {

  client.on("close", () => {
    socketStream.end()
  })
  
  let clientCelebrity;

  client.on("message", (message) => {
    clientCelebrity = message
    resetRules()

    addSearchRules([
      {value: clientCelebrity.toString(), tag: clientCelebrity.toString()}
    ])

    tweetCounter.counterMacron = 0
    tweetCounter.counterBeyonce = 0
    tweetCounter.counterZuckerberg = 0
    tweetCounter.counterDrake = 0
    tweetCounter.counterDicaprio = 0
    tweetCounter.counterUser = 0
  })


  const socketStream = WebSocket.createWebSocketStream(client)

  const tweetCounter = new Transform({
    objectMode: true,
  
    transform(chunk, _, callback) {
      if(chunk.matching_rules){
        switch(chunk.matching_rules[0].tag){
          case 'macron' :
            this.counterMacron ++;
            break;
          case 'beyonce' :
            this.counterBeyonce ++;
            break;
          case 'zuckerberg' :
            this.counterZuckerberg ++;
            break;
          case 'drake' :
            this.counterDrake ++;
            break;
          case 'dicaprio' :
              this.counterDicaprio ++;
              break;
          case `${clientCelebrity}` : 
              this.counterUser ++;
              break;
          default : 
        }
      }
      
      
      const counters = {
        'macron' : this.counterMacron,
        'drake' : this.counterDrake,
        'zuckerberg' : this.counterZuckerberg,
        'beyonce' : this.counterBeyonce,
        'dicaprio' : this.counterDicaprio,
        'user': {
          'name' : clientCelebrity,
          'counter' : this.counterUser
        }
      }

      //console.log(counters)
      this.push(JSON.stringify(counters))
      callback()
    }
  })


  tweetCounter.counterMacron     = 0
  tweetCounter.counterBeyonce    = 0
  tweetCounter.counterZuckerberg = 0
  tweetCounter.counterDrake      = 0
  tweetCounter.counterDicaprio   = 0
  tweetCounter.counterUser       = 0
    
  pipeline(
    tweetStream,
    jsonParser,
    tweetCounter,
    socketStream,
    (err) => {
      if (err) {
        console.error("pipeline error: ", err)
      }
    }
  )

  

})


// connexion API Twitter
connectToTwitter()

//vider puis ajouter les fitres
async function resetRules(){
  const existingRules = await getSearchRules();
  const ids = existingRules?.data?.map(rule => rule.id)
  if(ids){
    await deleteSearchRules(ids)
  }

  await addSearchRules([
    { value: "macron", tag: "macron"},
    { value: "drake", tag: "drake"},
    { value: "zuckerberg", tag: "zuckerberg"},
    { value: "beyonce", tag: "beyonce"},
    { value: "dicaprio", tag: "dicaprio"}
  ])

  return Promise.resolve()
}

resetRules()





 

