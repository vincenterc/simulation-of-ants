import World from './world'

export default function sketch(p) {
  let world

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(255)

    world = new World(p)
  }

  p.draw = function() {
    world.display(p)
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}
