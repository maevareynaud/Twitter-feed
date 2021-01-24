require("dotenv").config()
const { pipeline, Transform } = require("stream")
const WebSocket = require("ws")
const  server  = require("./server")
const {connectToTwitter, tweetStream} = require("./twitter")
const {jsonParser} = require("./process-tweets")
const { getSearchRules, addSearchRules, deleteSearchRules} = require('./search-rules')


// server http
server.listen(3000)
const wsServer = new WebSocket.Server({ server })

wsServer.on("connection", (client) => {
  
  let clientCelebrity;

  client.on("close", () => {
    socketStream.end()
  })

  client.on("message", (message) => {

    //add new dynamic rule when client send a message
    clientCelebrity = message
    resetRules()
    addSearchRules([
      { value: clientCelebrity.toString(), tag: clientCelebrity.toString()}
    ])

    //reset counters when new celebrity is send by client
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
        "items":[
          { "type": "auto", "name": 'Emmanuel Macron',  "counter": this.counterMacron},
          { "type": "auto", "name": 'Marc Zuckerberg', "counter": this.counterZuckerberg},
          { "type": "auto", "name": 'Beyonce', "counter": this.counterBeyonce},
          { "type": "auto", "name": 'Drake', "counter": this.counterDrake},
          { "type": "auto", "name": 'Leonardo Dicaprio', "counter": this.counterDicaprio},
          { "type": "user", "name": clientCelebrity, "counter": this.counterUser}
        ]
      }


      //sort counters
      counter_sorted = counters["items"].sort(function(a,b){
        return b.counter - a.counter;
      })

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





 

