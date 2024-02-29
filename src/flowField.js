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
  flowField.animate()
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(flowFieldAnimation)
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  flowField = new FlowField(ctx, canvas.width, canvas.height)
  flowField.animate()
})

const mouse = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y
  console.log('mouse', mouse)
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
  }
  #draw(x, y) {
    const length = 300
    this.#ctx.beginPath()
    this.#ctx.moveTo(x, y)
    this.#ctx.lineTo(mouse.x, mouse.y)
    this.#ctx.stroke()
  }
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime
    this.lastTime = timeStamp
    this.angle += 0.1
    // this.#ctx.clearRect(0, 0, this.#width, this.#height)
    this.#draw(this.#width / 2 + Math.sin(this.angle) * 100, this.#height / 2 + Math.cos(this.angle) * 100)
    // console.log('animate')
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }
}