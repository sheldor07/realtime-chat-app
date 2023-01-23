const express = require('express')
const http = require('http') 
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/',express.static(__dirname+'/public'))
io.on('connection',(socket) =>{
    console.log("connection", socket.id)
    socket.on('login',(data) =>{
        socket.join(data.username)
        socket.emit('logged_in')
        console.log('user logged in: ',data)
    })
    // socket.on('msg_send',(data) =>{
    //     io.emit('msg_rcvd',data)//emit on io not socket because if socket then the data is only sent back to that socket
    // })
})


server.listen(4545,() =>{
    console.log('server started on localhost:4545')
})