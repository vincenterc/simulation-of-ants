import Ant, { ANT_STATES } from './ant'

export const TILE_SIZE = 20

export const TILE_TYPES = {
  GROUND: 1,
  HOME: 2,
  FOOD: 3,
  WATER: 4,
  POISON: 5,
}

class World {
  constructor(p) {
    this.cols = Math.floor(p.width / TILE_SIZE)
    this.rows = Math.floor(p.height / TILE_SIZE)

    this.food_num = 20
    this.water_num = 15
    this.poison_num = 8

    this.terrain = Array(this.cols)
      .fill()
      .map(() => Array(this.rows).fill())

    this.antsHomePosition = {}
    this.ants = []

    this.init(p)
  }

  init = p => {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.terrain[i][j] = TILE_TYPES.GROUND
      }
    }

    this.antsHomePosition = {
      col: Math.ceil(this.cols / 2),
      row: Math.ceil(this.rows / 2),
    }
    this.terrain[this.antsHomePosition.col][this.antsHomePosition.row] =
      TILE_TYPES.HOME

    this.add_ant(this.antsHomePosition.col, this.antsHomePosition.row)
    this.add_ant(this.antsHomePosition.col, this.antsHomePosition.row)

    this._setTileTypeAtRandom(p, TILE_TYPES.FOOD, this.food_num)
    this._setTileTypeAtRandom(p, TILE_TYPES.WATER, this.water_num)
    this._setTileTypeAtRandom(p, TILE_TYPES.POISON, this.poison_num)
  }

  update = p => {
    this.ants.forEach(ant => ant.update(p, this))
    this.ants = this.ants.filter(ant => ant.state !== ANT_STATES.DEAD)
  }

  display = p => {
    this.terrain.forEach((col, i) =>
      col.forEach((tile, j) => {
        p.noStroke()
        if (tile === TILE_TYPES.HOME) {
          p.fill(232, 155, 0)
        } else if (tile === TILE_TYPES.FOOD) {
          p.fill(0, 255, 0)
        } else if (tile === TILE_TYPES.WATER) {
          p.fill(0, 0, 255)
        } else if (tile === TILE_TYPES.POISON) {
          p.fill(255, 0, 0)
        } else {
          p.fill(255)
        }

        p.rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      })
    )

    this.ants.forEach(ant => ant.display(p))
  }

  _setTileTypeAtRandom = (p, type, num) => {
    for (let i = 1; i <= num; i++) {
      let { col, row } = this._getRandomColRow(p)

      this.terrain[col][row] = type
    }
  }

  _getRandomColRow = p => {
    let col
    let row

    do {
      col = Math.floor(p.random(this.cols))
      row = Math.floor(p.random(this.rows))
    } while (this.terrain[col][row] !== TILE_TYPES.GROUND)

    return { col, row }
  }

  add_ant = (col, row) => {
    this.ants.push(new Ant(ANT_STATES.FORAGE, col, row))
  }
}

export default World
