const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./models/note')


app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(result => {
    response.json(result)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response) => {

  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ error: 'malformatted id' })
  }

  Note.findById(id).then(note => {
    if (note) {
      console.log(note)
      response.json(note)
    }
    else {
      console.log('not found')
      response.status(404).end()
    }
  })
})

app.delete('/api/notes/:id', (request, response) => {
  // return deleted note if it exists, else return 404
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ error: 'malformatted id' })
  }
  
  let deletedNote = null

  Note.findById(request.params.id).then(note => {
    if (!note) {
      return response.status(404).end()
    }
    deletedNote = note
    return Note
      .deleteOne({ _id: request.params.id })
  }
  ).then(() => {
    if (deletedNote) {
      response.json(deletedNote)
    } else {
      response.status(404).end()
    }
  })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})