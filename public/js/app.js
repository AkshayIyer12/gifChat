(() => {
  let socket = io()
  let form = document.getElementsByTagName('form')[0]
  let input = document.getElementById('m')
  let ul = document.getElementById('messages')
  let files = ''
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(socket.id)
    let obj = {
      msg: input.value,
      file: files
    }
    socket.emit('message', obj)
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
  document.getElementById('read_img').addEventListener('change', function readURL (input) {
    files = input.explicitOriginalTarget.files
    if (files && files[0]) {
      let reader = new FileReader()
      reader.onload = function (e) {
        [['src', e.target.result], ['width', 200], ['height', 350]].map(([a, b]) => setAttr(a, b))
      }
      reader.readAsDataURL(files[0])
    }
  })
  function setAttr (key, value) {
    document.getElementById('blah').setAttribute(key, value)
  }
  let video = document.querySelector('#videoElement')
  let canvas = document.getElementById('canvas')
  let data = canvas.getContext('2d')
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError)
  }

  function handleVideo (stream) {
    video.src = window.URL.createObjectURL(stream)
  }

  function videoError (e) {
    console.error(e)
  }

  document.getElementById('capture').addEventListener('click', function () {
    data.drawImage(video, 0, 0, 400, 300)
  })
})()
