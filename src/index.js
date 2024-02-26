const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

canvas.width = 1150
canvas.height = 600

canvas.style.border = '1px solid black'

const animate = () => {
  bounceBallLikeDVDScreensaver()
  if (keys.enter.pressed) {
    ballGrow()
  }
  if (keys.w.pressed) {
    ball.dy -= .1
  }
  if (keys.a.pressed) {
    ball.dx -= .1
  }
  if (keys.s.pressed) {
    ball.dy += .1
  }
  if (keys.d.pressed) {
    ball.dx += .1
  }
  if (keys.i.pressed) {
    bar.y -= bar.speed
  }
  if (keys.j.pressed) {
    bar.x -= bar.speed
  }
  if (keys.k.pressed) {
    bar.y += bar.speed
  }
  if (keys.l.pressed) {
    bar.x += bar.speed
  }
  if (keys.u.pressed) {
    bar.angle -= 0.1
  }
  if (keys.o.pressed) {
    bar.angle += 0.1
  }
  if (nothingPressed() && !isTouchingCanvas()) {
    // instantly stops the ball, very fun
    // ball.dx = 0
    // ball.dy = 0
    if (ball.lineWidth < 4) {
      ball.lineWidth += 0.05
    }
  }
  const [oX, oY] = getRotatedOverlap()
  if (!keys.enter.pressed && ball.lineWidth > 0) {
    console.log('oX', oX, 'oY', oY)
    if (oX * oY > 0 && oX > oY) {
      ball.dx = -ball.dx
      ballGrow()
    }
    if (oX * oY > 0 && oY > oX) {
      ball.dy = -ball.dy
      ballGrow()
    }
  }

  bar.draw()

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const ball = {
  x: canvas.width / 2 + 50,
  y: canvas.height / 2 + 50,
  radius: 10,
  speed: 4,
  dx: 10 * Math.random() - 1,
  dy: 2 * Math.random() - 1,
  visible: true,
  strokeStyle: 'black',
  lineWidth: 4,
  fillStyle: 'red',
  draw: () => {
    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fillStyle = 'red'
    context.fill()
    context.arc(ball.x, ball.y, ball.radius + 1, 0, Math.PI * 2)
    context.strokeStyle = 'black'
    context.stroke()
  }
}

const bar = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 10,
  dx: 0,
  dy: 0,
  angle: Math.PI / 2,
  visible: true,
  strokeStyle: 'rgba(0, 0, 0, 1)',
  lineWidth: 4,
  fillStyle: 'rgba(255, 255, 0, 1)',
  draw: () => {
    context.lineWidth = bar.lineWidth
    context.fillStyle = bar.fillStyle
    context.strokeStyle = bar.strokeStyle
    if (bar.angle !== 0) {
      const tempx = bar.x + bar.width / 2
      const tempy = bar.y + bar.height / 2
      context.save()
      context.translate(tempx, tempy)
      context.rotate(bar.angle)
      context.fillStyle = bar.fillStyle
      context.fillRect(-bar.width / 2, -bar.height / 2, bar.width, bar.height)
      context.strokeRect(-bar.width / 2, -bar.height / 2, bar.width, bar.height)
      context.restore()

      context.beginPath()
      context.arc(tempx, tempy, 5, 0, Math.PI * 2)
      context.fillStyle = 'rgba(255, 0, 255, 1)'
      context.fill()
    } else {
      context.fillRect(bar.x, bar.y, bar.width, bar.height)
      context.strokeRect(bar.x, bar.y, bar.width, bar.height)
    }
  }
}

const bounceBallLikeDVDScreensaver = () => {
  if (!ball.visible) return

  // comment the following line to see the ball color in the canvas
  // context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(0, 0, 255, 0.3)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  ball.draw()

  if (isCollidingX()) {
    ball.dx = -ball.dx
    ballGrow()
  }
  if (isCollidingY()) {
    ball.dy = -ball.dy
    ballGrow()
  }

  ball.x += ball.dx
  ball.y += ball.dy

  document.getElementById('stat1').innerHTML = `X: ${Math.floor(ball.x)}, Y: ${Math.floor(ball.y)}`
  document.getElementById('stat2').innerHTML = `DX: ${Math.floor(ball.dx * 100)}, DY: ${Math.floor(ball.dy * 100)}`
}

const ballGrow = (dLineWidth, dRadius) => {
  console.log('Ball Grow')

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

  ball.lineWidth -= dLineWidth || 0.1
  ball.radius += dRadius || 0.3
}

let currentExperiment = 0
let lastExperiment = ''

const experiments = [{
  name: 'Ball Bounce DVD',
  fn: bounceBallLikeDVDScreensaver,
}, {
  name: 'Ball Explode',
  fn: ballGrow,
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

const nothingPressed = () => {
  return ['w', 'a', 's', 'd', 'enter'].every(key => !keys[key].pressed)
}

const isTouchingCanvas = () => ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0 || ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0
const isCollidingX = () => ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0
const isCollidingY = () => ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0
const isColliding = () => isCollidingX() || isCollidingY()

const getOverlap = () => {
  const xOverlap = Math.max(0, Math.min(ball.x + ball.radius, bar.x + bar.width) - Math.max(ball.x - ball.radius, bar.x))
  const yOverlap = Math.max(0, Math.min(ball.y + ball.radius, bar.y + bar.height) - Math.max(ball.y - ball.radius, bar.y))
  return xOverlap * yOverlap
}

const getRotatedOverlap = () => {
  if (bar.angle === 0) return getOverlap();
  else {
    const centerX = bar.x + bar.width / 2;
    const centerY = bar.y + bar.height / 2;

    const dx = ball.x - centerX;
    const dy = ball.y - centerY;

    // rotate around bar center
    const rotatedBallX = dx * Math.cos(-bar.angle) - dy * Math.sin(-bar.angle) + centerX;
    const rotatedBallY = dx * Math.sin(-bar.angle) + dy * Math.cos(-bar.angle) + centerY;

    const xOverlap = Math.max(0, Math.min(rotatedBallX + ball.radius, bar.x + bar.width) - Math.max(rotatedBallX - ball.radius, bar.x));
    const yOverlap = Math.max(0, Math.min(rotatedBallY + ball.radius, bar.y + bar.height) - Math.max(rotatedBallY - ball.radius, bar.y));

    return [xOverlap, yOverlap];
  }
}