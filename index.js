const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
io.on('connection', socket => {
  console.log(Object.keys(socket))
  console.log('--------------------------')
  console.log('A new user got connected')
  socket.on('message', msg => {
    console.log(msg)
    io.emit('message', {
      data: msg,
      id: socket.id
    })
  })
  socket.on('disconnect', () => console.log('user disconnected'))
})

http.listen(3000, () => console.log('Listening on 3000'))
