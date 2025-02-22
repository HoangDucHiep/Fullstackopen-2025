const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url.replace(process.env.MONGODB_URI_PASSWORD, "***password***"))

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)/*  */

module.exports = mongoose.model('Note', noteSchema)/*  */