const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const route = require('./routes')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())
app.use('/', route)

let userLogin = []
let messages = []
let time = 20
let gameStart

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('login', (user) => {
        userLogin.push(user)
        io.emit('userLogin', userLogin)
    })

    socket.on('enterGame', () => {
        if (!gameStart) {
            io.emit('gameStart', gameStart)
            gameStart = true
            const data = userLogin.map(el => {
                const scoreboard = {
                    username: el,
                    score: 0
                }
                return scoreboard
            })
            userLogin = []
            io.emit('fetchEnteredUser', data)
        } else {
            io.emit('gameStart', gameStart)
        }
    })

    socket.on('finish', () => {
        gameStart = false
        messages = []
        io.emit('gameStart', gameStart)
    })


    socket.on('timer', () => {
        time -= 1;
        io.emit('fetchTime', time)
    })

    socket.on('resetTimer', () => {
        time = 20
        io.emit('fetchTime', time)
    })
})

http.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})