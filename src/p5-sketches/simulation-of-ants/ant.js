import { TILE_SIZE } from './world'

export const ANT_STATES = {
  FORAGE: 1,
  GO_HOME: 2,
  THIRSTY: 3,
  DEAD: 4,
}

export default class Ant {
  constructor(state, col, row) {
    this.state = state
    this.col = col
    this.row = row
    this.size = TILE_SIZE / 2
  }

  display = p => {
    p.noStroke()
    p.fill(0)
    p.circle(
      this.col * TILE_SIZE + TILE_SIZE / 2,
      this.row * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE / 2
    )
  }
}
