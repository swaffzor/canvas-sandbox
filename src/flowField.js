let canvas;
let ctx;
let flowField;
let flowFieldAnimation
let isPaused = false
let angleInfluence = .001
let lengthInfluence = 0.001

window.onload = () => {
  canvas = document.getElementById('myCanvas')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  flowField = new FlowField(ctx, canvas.width, canvas.height)
  flowField.animate(0)
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(flowFieldAnimation)
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  flowField = new FlowField(ctx, canvas.width, canvas.height)
  flowField.animate(0)
})

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'q':
      angleInfluence -= 0.001
      break
    case 'w':
      angleInfluence += 0.001
      break
    case 'a':
      lengthInfluence -= 0.001
      break
    case 's':
      lengthInfluence += 0.001
      break
    default:
      break
  }
  document.getElementById('angleValue').innerText = angleInfluence.toFixed(5)
  document.getElementById('angleSlider').value = angleInfluence * 1000
  document.getElementById('lengthValue').innerText = lengthInfluence.toFixed(5)
  document.getElementById('lengthSlider').value = lengthInfluence * 1000
})

window.addEventListener('click', () => {
  if (isPaused) {
    flowField.animate(0)
    isPaused = false
  } else {
    cancelAnimationFrame(flowFieldAnimation)
    isPaused = true
    console.log('paused')
    console.log('angleInfluence', angleInfluence)
    console.log('lengthInfluence', lengthInfluence)
  }
})

const updateLength = (value) => {
  lengthInfluence = 1 / (value * 100)
  document.getElementById('lengthSlider').innerText = lengthInfluence.toFixed(5)
}
const updateAngle = (value) => {
  angleInfluence = 1 / (value * 1000)
  document.getElementById('angleValue').innerText = angleInfluence.toFixed(5)
}
document.getElementById('angleValue').innerText = angleInfluence.toFixed(5)
document.getElementById('angleSlider').value = angleInfluence * 1000

const mouse = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y
})

class FlowField {
  #ctx
  #width
  #height
  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#ctx.lineWidth = 1
    this.#width = width
    this.#height = height
    this.angle = 0
    this.lastTime = 0
    this.interval = 1000 / 60 // 60 fps
    this.timer = 0
    this.cellSize = 15
    this.gradient
    this.#createGradient()
    this.#ctx.strokeStyle = this.gradient
    this.radius = .25
    this.vr = 0.03 // veloicty of radius
  }

  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height)
    this.gradient.addColorStop(0.1, '#ff5c33')
    this.gradient.addColorStop(0.2, '#ff66b3')
    this.gradient.addColorStop(0.4, '#ccccff')
    this.gradient.addColorStop(0.6, '#b3ffff')
    this.gradient.addColorStop(0.8, '#80ff80')
    this.gradient.addColorStop(0.9, '#ffff33')
  }

  #drawLine(angle, x, y) {
    let positionX = x
    let positionY = y
    let dx = mouse.x - positionX
    let dy = mouse.y - positionY
    let distance = (dx * dx + dy * dy) // Math.sqrt is slow
    if (distance > 600_000) distance = 600_000
    else if (distance < 50_000) distance = 50_000
    let length = distance * lengthInfluence

    this.#ctx.beginPath()
    this.#ctx.moveTo(x, y)
    this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
    this.#ctx.stroke()
  }

  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime
    this.lastTime = timeStamp
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height)
      this.radius += this.vr
      if (this.radius > 10 || this.radius < -10) this.vr *= -1

      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = (Math.cos(mouse.x * x * angleInfluence) + Math.sin(mouse.y * y * angleInfluence)) * this.radius
          this.#drawLine(angle, x, y)
        }
      }

      this.timer = 0
    } else {
      this.timer += deltaTime
    }
    // console.log('animate')
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }
}