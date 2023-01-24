const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static(__dirname + '/public'))
let users = {
    yajat: 'password123'
}
let socketMap = {}
io.on('connection', (socket) => {
    console.log("connection", socket.id)

    function login(s, u) {
        s.join(u)
        s.emit('logged_in')
        socketMap[s.id] = u
        console.log(socketMap)
    }

    // socket.on('msg_send',(data) =>{
    //     console.log(data)
    //     socket.emit('msg_rcvd',data)//emit on io not socket because if socket then the data is only sent back to that socket
    // })
    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] === data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login_failed')
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)

        }
        console.log(users)
    })
    socket.on('msg_send', (data) => {
        data.from = socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
        socket.emit('msg_rcvd', data)
    })
})


server.listen(4545, () => {
    console.log('server started on localhost:4545')
})