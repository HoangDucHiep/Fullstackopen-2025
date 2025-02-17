const express = require("express");
var morgan = require('morgan');
const app = express();
const PORT = 3001;


morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


/* const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
} */

app.get("/info", (req, res) => {

    const today = new Date();

    res.send(`
        <p>Phonebook has info for ${persons.length}</p>
        <p>${today}</p>`)
})


// get all
app.get("/api/persons", (req, res) => {
    res.json(persons);
})


// get id
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

// delete
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
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
    const nameExist = persons.find(p => p.name === body.name);
    if (nameExist) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);
    res.json(person);
})


// listen to port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})