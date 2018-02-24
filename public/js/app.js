(() => {
  let socket = io()
  let button = document.getElementsByTagName('button')[0]
  let input = document.getElementById('m')
  let ul = document.getElementById('messages')
  button.addEventListener('click', () => {
    console.log(socket.id)
    socket.emit('message', input.value)
    ul.innerHTML += `<li>${input.value}</li>`
    input.value = ''
    return false
  })
  socket.on('message', ({data, id}) => {
    if (socket.id !== id) {
      let li = `<li>${data}</li>`
      ul.innerHTML += li
    }
  })
})()
