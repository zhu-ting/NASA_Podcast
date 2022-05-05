const express = require('express')
const { getRSSFeed } = require('./utilities/rss-parser')

const app = express()
const port = 3000

let link = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss'
let rss

app.get('/', async (req, res) => {
    rss = await getRSSFeed(link)
    rssTenItems = rss.items.slice(0, 10)
    res.send(rssTenItems)
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
