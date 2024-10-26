const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan())
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const fullDate = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${fullDate}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(204).json({
            error: "Person not found."
        })
    }
    
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateNumber = (min, max) => {
    return 
} 
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Missing params."
        })
    }

    const nameExists = persons.find(p => p.name === body.name)

    if (nameExists) {
        return response.status(400).json({
            error: "Name must be unique."
        })
    }

    const newPerson = {
        id: Math.floor((Math.random() * 10000) + 5),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})

