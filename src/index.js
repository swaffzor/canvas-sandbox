const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

canvas.width = 1150
canvas.height = 600

canvas.style.border = '1px solid black'

let frame = 0

const animate = () => {
  frame++
  experiments[currentExperiment].fn()
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const ball = {
  x: canvas.width / 2 - 5,
  y: canvas.height / 2 - 5,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true,
  strokeStyle: 'black',
  lineWidth: 4,
  fillStyle: 'red',
}

const bounceBallLikeDVDScreensaver = () => {
  if (lastExperiment !== 'Ball Bounce DVD') {
    lastExperiment = 'Ball Bounce DVD'
    console.log('Ball Bounce DVD')
    ball.visible = true
    ball.lineWidth = 4
    context.lineWidth = 4
    context.stroke()
    // ball.x = canvas.width / 2 - 5
    // ball.y = canvas.height / 2 - 5
    // ball.dx = 4
    // ball.dy = -4
  }
  // toggle the following line to see the ball color in the canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.fillStyle = 'red'
  context.fill()
  context.strokeStyle = 'black'
  context.stroke()

  ball.x += ball.dx
  ball.y += ball.dy

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy
  }

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx
  }

  document.getElementById('stat1').innerHTML = `X: ${ball.x}, Y: ${ball.y}`
  document.getElementById('stat2').innerHTML = `DX: ${ball.dx}, DY: ${ball.dy}`
}


const ballExplode = () => {
  if (lastExperiment !== 'Ball Explode') {
    console.log('Ball Explode')
    lastExperiment = 'Ball Explode'
    ball.lineWidth = 4
    ball.visible = true
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  if (ball.lineWidth < 0) {
    ball.visible = false
    return
  }

  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.strokeStyle = ball.strokeStyle
  context.lineWidth = ball.lineWidth
  context.stroke()
  console.log('ball.lineWidth', ball.lineWidth)

  ball.lineWidth -= 0.2
  ball.radius += 3
}

let currentExperiment = 0
let lastExperiment = ''

const experiments = [{
  name: 'Ball Bounce DVD',
  fn: bounceBallLikeDVDScreensaver,
}, {
  name: 'Ball Explode',
  fn: ballExplode,
}]

const startExperiment = (experiment) => {
  currentExperiment = experiment
  requestAnimationFrame(experiments[experiment].fn)
}

const experimentButtons = document.getElementById('stat3')
experimentButtons.classList.add('experiment-buttons')
experimentButtons.innerHTML = experiments.map((e, i) => {
  return `<button onclick="startExperiment(${i})">${e.name}</button>`
}).join('')