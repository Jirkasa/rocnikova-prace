/**
 * Configuration of game.
 * @prop {number} TILE_SIZE Size of one tile.
 * @prop {number} SIDE_GROUND_SIZE Size of ground on sides where player can't go.
 * @prop {number} NUMBER_OF_TILES Number of tiles from left to right.
 * @prop {number} NUMBER_OF_VISIBLE_LANES Number of lanes that are visible in scene at a time.
 * @prop {number} MAX_LANE_POSITION Maximum position of lane until it is removed.
 */
const Config = {
    TILE_SIZE: 1.3,
    SIDE_GROUND_SIZE: 60,
    NUMBER_OF_TILES: 9,
    NUMBER_OF_VISIBLE_LANES: 50,
    MAX_LANE_POSITION: 20
}

export default Config;