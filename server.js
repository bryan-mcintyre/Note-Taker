const express = require('express')
const path = require('path')
const { clog } = require('./middleware/clog')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001

const app = express()

// Import custom middleware "clog"
app.use(clog)

// Middleware for parsing JSON and urlencoded from data
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api', api)

app.use(express.static('public'))

// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// Wildcard route directs back to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`)
)