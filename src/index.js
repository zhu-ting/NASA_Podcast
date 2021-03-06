const express = require('express')
const { getRSSFeed } = require('./utilities/rss-parser')
const { convertISODateToAEST } = require('./utilities/format-iso-date-to-AEST')

const app = express()
const port = 3000

let link = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss'
let rss, asc, desc, displayItems

const getNASAPodcast = async () => {
    rss = await getRSSFeed(link)
    displayItems = rss.items.slice(0, 10).map(item => (
        {
            ...item,
            'publishedDate': convertISODateToAEST(item.isoDate)
        }
    ))
}

app.get('/', (req, res) => {
    getNASAPodcast()

    res.send(displayItems)
})

app.get('/sort', (req, res) => {
    getNASAPodcast()
    
    // http://localhost:3000/sort?order=asc
    if (req.query.order === 'asc') {
        asc = displayItems.sort((a, b) => (a.isoDate > b.isoDate) ? 1 : ((b.isoDate > a.isoDate) ? -1 : 0))
        res.send(asc)
    }
    //http://localhost:3000/sort?order=desc
    if (req.query.order === 'desc') {
        desc = displayItems.sort((a, b) => (a.isoDate > b.isoDate) ? -1 : ((b.isoDate < a.isoDate) ? 1 : 0))
        res.send(desc)
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
