window.addEventListener('keydown', (event) => {
  lastKey !== event.key && console.log(event.key, 'down')
  switch (event.key) {
    case 'Enter':
      keys.enter.pressed = true;
      document.getElementById('button-enter').classList.add('pressed')
      break;
    case 'w':
      keys.w.pressed = true;
      document.getElementById('button-up').classList.add('pressed')
      break;
    case 'a':
      keys.a.pressed = true;
      document.getElementById('button-left').classList.add('pressed')
      break;
    case 's':
      keys.s.pressed = true;
      document.getElementById('button-down').classList.add('pressed')
      break;
    case 'd':
      keys.d.pressed = true;
      document.getElementById('button-right').classList.add('pressed')
      break;
    case 'i':
      keys.i.pressed = true;
      break;
    case 'j':
      keys.j.pressed = true
      break;
    case 'k':
      keys.k.pressed = true
      break;
    case 'l':
      keys.l.pressed = true
      break;
    case 'u':
      keys.u.pressed = true
      break;
    case 'o':
      keys.o.pressed = true
      break;
    default:
      break;
  }

  lastKey = event.key
})

window.addEventListener('keyup', (event) => {
  console.log(event.key, 'up')
  switch (event.key) {
    case 'Enter':
      keys.enter.pressed = false;
      document.getElementById('button-enter').classList.remove('pressed')
      break;
    case 'w':
      keys.w.pressed = false;
      document.getElementById('button-up').classList.remove('pressed')
      break;
    case 'a':
      keys.a.pressed = false;
      document.getElementById('button-left').classList.remove('pressed')
      break;
    case 's':
      keys.s.pressed = false;
      document.getElementById('button-down').classList.remove('pressed')
      break;
    case 'd':
      keys.d.pressed = false;
      document.getElementById('button-right').classList.remove('pressed')
      break;
    case 'i':
      keys.i.pressed = false;
      break;
    case 'j':
      keys.j.pressed = false;
      break;
    case 'k':
      keys.k.pressed = false;
      break;
    case 'l':
      keys.l.pressed = false;
      break;
    case 'u':
      keys.u.pressed = false;
    case 'o':
      keys.o.pressed = false;
      break;
    default:
      break;
  }
})

const keys = {
  enter: {
    pressed: false
  },
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
  i: {
    pressed: false
  },
  j: {
    pressed: false
  },
  k: {
    pressed: false
  },
  l: {
    pressed: false
  },
  u: {
    pressed: false
  },
  o: {
    pressed: false
  }
}

let lastKey = ''