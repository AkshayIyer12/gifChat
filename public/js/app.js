(() => {
  let socket = io()
  let form = document.getElementsByTagName('form')[0]
  let input = document.getElementById('m')
  let ul = document.getElementById('messages')
  form.addEventListener('submit', () => {
    console.log('hi')
    socket.emit('message', input.value)
    input.value = ''
    return false
  })
  socket.on('message', msg => {
    let li = `<li>${msg}</li>`
    ul.innerHTML += li
  })
})()
