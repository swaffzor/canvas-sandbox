# thought this was cool

```
const animate = () => {
  frame++
  experiments[currentExperiment].fn()
  requestAnimationFrame(animate)
}
```
