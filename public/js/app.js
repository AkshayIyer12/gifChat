(() => {
  let socket = io()
  let form = document.getElementsByTagName('form')[0]
  let input = document.getElementById('m')
  let ul = document.getElementById('messages')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
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
