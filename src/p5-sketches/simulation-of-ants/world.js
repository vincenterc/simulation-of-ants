const TILE_TYPES = {
  GROUND: 1,
  HOME: 2,
  FOOD: 3,
  WATER: 4,
  POISON: 5,
}

class World {
  constructor(p) {
    this.tile_size = 20

    this.cols = Math.floor(p.width / this.tile_size)
    this.rows = Math.floor(p.height / this.tile_size)

    this.food_num = 10
    this.water_num = 10
    this.poison_num = 5

    this.terrain = Array(this.cols)
      .fill()
      .map(() => Array(this.rows).fill())

    this.init(p)
  }

  init = p => {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.terrain[i][j] = TILE_TYPES.GROUND
      }
    }

    this.terrain[Math.ceil(this.cols / 2)][Math.ceil(this.rows / 2)] =
      TILE_TYPES.HOME

    this._setTileTypeAtRandom(p, TILE_TYPES.FOOD, this.food_num)
    this._setTileTypeAtRandom(p, TILE_TYPES.WATER, this.water_num)
    this._setTileTypeAtRandom(p, TILE_TYPES.POISON, this.poison_num)
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

        p.rect(
          i * this.tile_size,
          j * this.tile_size,
          this.tile_size,
          this.tile_size
        )
      })
    )
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
}

export default World
