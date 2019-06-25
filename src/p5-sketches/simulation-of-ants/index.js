export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(50)
  }

  p.draw = function() {}

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}
