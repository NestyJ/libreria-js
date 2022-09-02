let timerInterval

Swal.fire({
  title: '¡ALERTA! AUTO DESTRUCCIÓN',
  html:
    'Se va a destruir en <strong></strong> segundos.<br/><br/>' +
    '<button id="increase" class="btn btn-warning">' +
      '¡Clickea para tener 5 segundos mas!' +
    '</button><br/><br/>' +
    '<button id="stop" class="btn btn-danger">' +
      '¡CLICKEA AQUI PARA DETENERLO!' +
    '</button><br/><br/>' +
    '<button id="resume" class="btn btn-success" disabled>' +
      '¡Clickea aqui para que siga la cuenta regresiva!' +
    '</button><br/><br/>' +
    '<button id="toggle" class="btn btn-primary">' +
      'Siga' +
    '</button>',
  timer: 10000,
  didOpen: () => {
    const content = Swal.getHtmlContainer()
    const $ = content.querySelector.bind(content)

    const stop = $('#stop')
    const resume = $('#resume')
    const toggle = $('#toggle')
    const increase = $('#increase')

    Swal.showLoading()

    function toggleButtons () {
      stop.disabled = !Swal.isTimerRunning()
      resume.disabled = Swal.isTimerRunning()
    }

    stop.addEventListener('click', () => {
      Swal.stopTimer()
      toggleButtons()
    })

    resume.addEventListener('click', () => {
      Swal.resumeTimer()
      toggleButtons()
    })

    toggle.addEventListener('click', () => {
      Swal.toggleTimer()
      toggleButtons()
    })

    increase.addEventListener('click', () => {
      Swal.increaseTimer(5000)
    })

    timerInterval = setInterval(() => {
      Swal.getHtmlContainer().querySelector('strong')
        .textContent = (Swal.getTimerLeft() / 1000)
          .toFixed(0)
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
})
