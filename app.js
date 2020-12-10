const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors') 
const {Question, Answer} = require ("./models")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let userLogin = []

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('login', (user) => {
        userLogin.push(user)
        io.emit('userLogin', userLogin)
    })
})

app.get('/quiz', (req, res) => {
    let dataAnswers = {
        include : {
            model: Answer
        }
    }
    Question.findAll(dataAnswers)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(err.status).json(err)
    })
})

http.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})
