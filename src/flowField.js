let canvas;
let ctx;
let flowField;
let flowFieldAnimation

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
    this.#ctx.strokeStyle = 'white'
    this.#width = width
    this.#height = height
    this.angle = 0
    this.lastTime = 0
    this.interval = 1000 / 60 // 60 fps
    this.timer = 0
    this.cellSize = 15
  }
  #drawLine(x, y) {
    const length = 300
    this.#ctx.beginPath()
    this.#ctx.moveTo(x, y)
    this.#ctx.lineTo(mouse.x, mouse.y)
    this.#ctx.stroke()
  }
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime
    this.lastTime = timeStamp
    if (this.timer > this.interval) {
      this.timer = 0
      this.angle += 0.1
      this.#ctx.clearRect(0, 0, this.#width, this.#height)
      this.#drawLine(this.#width / 2 + Math.sin(this.angle) * 100, this.#height / 2 + Math.cos(this.angle) * 100)
    } else {
      this.timer += deltaTime
    }
    // console.log('animate')
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }
}