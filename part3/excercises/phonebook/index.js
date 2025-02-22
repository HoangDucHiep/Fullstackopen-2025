const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose')
var morgan = require('morgan');
var Person = require('./models/person');
const cors = require('cors');
const app = express();
const PORT = 3001;

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);


// error handler middleware
app.use((error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
});


app.get("/info", (req, res) => {

    const today = new Date();

    res.send(`
        <p>Phonebook has info for ${persons.length}</p>
        <p>${today}</p>`)
})


// get all
app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons);
    }).catch(error => next(error));
})

// get id
app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;


    Person.findById(id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error));
})

// delete
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'malformatted id' })
    }

    Person.findById(id).then(person => {
        if (person) {
            Person.deleteOne({ _id: id }).then(() => {
                res.json(person)
            })
        } else {
            res.status(404).end();
        }
    })
})

// add
app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        })
    }

    // ensure name must be unique
    const nameExist = Person.find({ name: body.name }).then(person => { 
        if (person.length > 0) {
            return res.status(400).json({
                error: "name must be unique"
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number
            })

            person.save().then(savedPerson => {
                res.json(savedPerson);
            }).catch(error => {
                console.log(error);
                res.status(500).end();
            })
        }
    });
})

// update 
app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson);
            } else {
                res.status(404).end();
            }
        }).catch(error => next(error));
});

// listen to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})