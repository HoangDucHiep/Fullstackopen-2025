const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  try {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  try {
    const savedNote = await note.save()
    response.json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => { 
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }
  
  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)
  } catch(exception) {
    next(exception)
  }
})

module.exports = notesRouter