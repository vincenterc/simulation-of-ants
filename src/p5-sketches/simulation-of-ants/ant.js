import { TILE_SIZE, TILE_TYPES } from './world'

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

  forage = (p, world) => {
    let { col, row } = this._randomMove(p, world.cols, world.rows)

    if (
      world.terrain[col][row] === TILE_TYPES.GROUND ||
      world.terrain[col][row] === TILE_TYPES.WATER ||
      world.terrain[col][row] === TILE_TYPES.HOME
    ) {
      this.col = col
      this.row = row
    }

    if (world.terrain[col][row] === TILE_TYPES.FOOD) {
      this.col = col
      this.row = row
      world.terrain[col][row] = TILE_TYPES.GROUND
      this.state = ANT_STATES.GO_HOME
      this._resetTileType(
        p,
        world.terrain,
        TILE_TYPES.FOOD,
        world.cols,
        world.rows
      )
    }

    if (world.terrain[col][row] === TILE_TYPES.POISON) {
      this.col = col
      this.row = row
      world.terrain[col][row] = TILE_TYPES.GROUND
      this.state = ANT_STATES.DEAD
      this._resetTileType(
        p,
        world.terrain,
        TILE_TYPES.POISON,
        world.cols,
        world.rows
      )
    }
  }

  goHome = (p, world) => {
    let { col, row } = this._goHome(
      world.antsHomePosition,
      world.cols,
      world.rows
    )

    if (
      world.terrain[col][row] === TILE_TYPES.GROUND ||
      world.terrain[col][row] === TILE_TYPES.FOOD ||
      world.terrain[col][row] === TILE_TYPES.WATER
    ) {
      this.col = col
      this.row = row
    }

    if (world.terrain[col][row] === TILE_TYPES.HOME) {
      this.col = col
      this.row = row
      this.state = ANT_STATES.THIRSTY
      world.add_ant(world.antsHomePosition.col, world.antsHomePosition.row)
    }

    if (world.terrain[col][row] === TILE_TYPES.POISON) {
      this.col = col
      this.row = row
      world.terrain[col][row] = TILE_TYPES.GROUND
      this.state = ANT_STATES.DEAD
      this._resetTileType(
        p,
        world.terrain,
        TILE_TYPES.POISON,
        world.cols,
        world.rows
      )
    }
  }

  thirsty = (p, world) => {
    let { col, row } = this._randomMove(p, world.cols, world.rows)

    if (
      world.terrain[col][row] === TILE_TYPES.GROUND ||
      world.terrain[col][row] === TILE_TYPES.FOOD ||
      world.terrain[col][row] === TILE_TYPES.HOME
    ) {
      this.col = col
      this.row = row
    }

    if (world.terrain[col][row] === TILE_TYPES.WATER) {
      this.col = col
      this.row = row
      world.terrain[col][row] = TILE_TYPES.GROUND
      this.state = ANT_STATES.FORAGE
      this._resetTileType(
        p,
        world.terrain,
        TILE_TYPES.WATER,
        world.cols,
        world.rows
      )
    }

    if (world.terrain[col][row] === TILE_TYPES.POISON) {
      this.col = col
      this.row = row
      world.terrain[col][row] = TILE_TYPES.GROUND
      this.state = ANT_STATES.DEAD
      this._resetTileType(
        p,
        world.terrain,
        TILE_TYPES.POISON,
        world.cols,
        world.rows
      )
    }
  }

  update = (p, world) => {
    switch (this.state) {
      case ANT_STATES.FORAGE:
        this.forage(p, world)
        break
      case ANT_STATES.GO_HOME:
        this.goHome(p, world)
        break
      case ANT_STATES.THIRSTY:
        this.thirsty(p, world)
        break
    }
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

  _goHome = (homePosition, colsTerrain, rowsTerrain) => {
    // Bresenham's line algorithm
    let col = this.col
    let row = this.row
    let endCol = homePosition.col
    let endRow = homePosition.row
    let dCol = Math.abs(endCol - col)
    let dRow = Math.abs(endRow - row)
    let sCol = col < endCol ? 1 : -1
    let sRow = row < endRow ? 1 : -1
    let err = dCol - dRow
    let e2 = 2 * err

    if (e2 > -dRow) {
      err -= dRow
      col += sCol
    }

    if (e2 < dCol) {
      err += dCol
      row += sRow
    }

    // basic
    // let col = this.col
    // let row = this.row
    // let homeCol = homePosition.col
    // let homeRow = homePosition.row

    // if (col < homeCol) col++
    // else if (col > homeCol) col--

    // if (row < homeRow) row++
    // else if (row > homeRow) row--

    // if (col < 0) col = colsTerrain - 1
    // if (col > colsTerrain - 1) col = 0
    // if (row < 0) row = rowsTerrain - 1
    // if (row > rowsTerrain - 1) row = 0

    return { col, row }
  }

  _randomMove = (p, colsTerrain, rowsTerrain) => {
    let col = this.col + Math.floor(p.random(0, 3) - 1)
    let row = this.row + Math.floor(p.random(0, 3) - 1)

    if (col < 0) col = colsTerrain - 1
    if (col > colsTerrain - 1) col = 0
    if (row < 0) row = rowsTerrain - 1
    if (row > rowsTerrain - 1) row = 0

    return { col, row }
  }

  _resetTileType = (p, terrain, tileType, colsTerrain, rowsTerrain) => {
    let col, row

    do {
      col = Math.floor(p.random(colsTerrain))
      row = Math.floor(p.random(rowsTerrain))
    } while (terrain[col][row] !== TILE_TYPES.GROUND)

    terrain[col][row] = tileType
  }
}
