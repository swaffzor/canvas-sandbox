const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

canvas.width = 1150
canvas.height = 600

canvas.style.border = '1px solid black'

const ball = {
  x: canvas.width / 2 - 5,
  y: canvas.height / 2 - 5,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4,
}

context.beginPath()
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
context.fillStyle = 'red'
context.fill()

let currentExperiment = 0

const animate = () => {
  experiments[currentExperiment].fn()
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const bounceBallLikeDVDScreensaver = () => {
  // toggle the following line to see the ball color in the canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  context.fillStyle = 'red'
  context.fill()

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

const startExperiment = (experiment) => {
  currentExperiment = experiment
  requestAnimationFrame(experiments[experiment].fn)
}

const experiments = [{
  name: 'Ball Bounce DVD',
  fn: bounceBallLikeDVDScreensaver,
}]

document.getElementById('stat3').innerHTML = experiments.map((e, i) => {
  return `<button onclick="startExperiment(${i})">${e.name}</button>`
}).join('')