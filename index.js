const http = require('https')
const { Writable, Readable, pipeline, Transform } = require('stream')

const TWT_API_HOST = "api.twitter.com"
const TWT_API_URL = "/2/tweets/sample/stream?tweet.fields=attachments,author_id,geo&expansions=author_id,attachments.media_keys&media.fields=url"
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAJqyLwEAAAAAf%2BIab%2BZtVdeKiPowrKwB0Pb6%2FzQ%3D7i4km0j9NIweU0ApkyNOkQm1TGmVN79edEqx1K6xiUnxgVRn0p"

const options = {
    host: TWT_API_HOST,
    path: TWT_API_URL,
    method: "GET",
    headers: {
        Authorization: "Bearer " + BEARER_TOKEN
    }

}

const tweetStream = new Readable({
    read(){}
})

const jsonParser = new Transform({
    readableObjectMode:true,
    transform(chunk, encoding, callback){
        let dat
        try{
            data = JSON.parse(chunk)
        } catch (error) {

        }

        if(data) {
            this.push(data)
        }
        callback()
    }
})

const req = http.request(options, (res) => {
    res.on('data', (chunk) => {
        tweetStream.push(chunk)
    })
})

const logger = new Writable({
    objectMode: true,
    write(chunk, encoding, callback){
        try {
            console.log(JSON.stringify(chunk))
        } catch (err) {
            //
        }
        callback()
    }
})

req.on('error', (err) => {
    console.error(err)
})


req.end()

pipeline(
    tweetStream,
    jsonParser,
    logger,
    (err) => {
        console.error(err)
    }
)