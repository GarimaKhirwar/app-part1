const express = require('express')
const app = express()
// const cors = require('cors') 

app.use(express.static('dist'))
// app.use(cors())

//  Built-in middleware to parse incoming JSON bodies
app.use(express.json())

//  Custom middleware definition (moved up so app.use can see it)
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

//  Enable the logger middleware
app.use(requestLogger)

let notes = [
    {
        id: "1",
    content: "HTML is easy",
    important: true
},
{
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
},
{
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
}
]

app.get('/api/notes', (request, response) => {
    
    if (notes) {
        response.json(notes)
        
    } else {
        response.status(404).end()
    }
})


app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    
    if (note) {
        response.json(note)
        
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3003
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

