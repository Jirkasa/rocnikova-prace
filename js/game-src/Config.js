import * as THREE from 'three';

/**
 * Configuration of game.
 * @prop {number} TILE_SIZE Size of one tile.
 * @prop {number} SIDE_GROUND_SIZE Size of ground on sides where player can't go.
 * @prop {number} NUMBER_OF_TILES Number of tiles from left to right.
 * @prop {number} NUMBER_OF_VISIBLE_LANES Number of lanes that are visible in scene at a time.
 * @prop {number} MAX_LANE_POSITION Maximum position of lane until it is removed.
 * @prop {number} CAMERA_START_POSITION Start position of camera.
 * @prop {number} CHICKEN_JUMP_HEIGHT Height of jump for chicken.
 * @prop {number} CHICKEN_SPEED Speed of chicken in miliseconds (moving, rotation and jumping).
 * @prop {number} CHICKEN_HIT_SIZE Hit space size for chicken.
 * @prop {number} CAMERA_DAMPING Damping for camera movement.
 * @prop {number} MAX_NUMBER_OF_TREES_PER_LANE Maximum number of trees per lane.
 * @prop {number} TREE_MAX_LEAVES_HEIGHT Max height of leaves for trees.
 * @prop {number} CAR_DRIVE_SPACE_SIZE Size of space where cars are moving.
 * @prop {number} CAR_SIZE Size (length) of a car.
 * @prop {number} CAR_FRONT_FROM_ORIGIN Distance to front of car from origin of car.
 * @prop {number} CAR_BACK_FROM_ORIGIN Distance to back of car from origin of car.
 * @prop {number} MIN_DISTANCE_BETWEEN_CARS Minimum distance between cars.
 * @prop {number} MAX_DISTANCE_BETWEEN_CARS Maximum distance between cars.
 * @prop {number} MAX_NUMBER_OF_GRASS_LANES_NEXT_TO_EACH_OTHER Maximum number of grass lanes next to each other.
 */
const Config = {
    TILE_SIZE: 1.3,
    SIDE_GROUND_SIZE: 60,
    NUMBER_OF_TILES: 9,
    NUMBER_OF_VISIBLE_LANES: 50,
    MAX_LANE_POSITION: 20,
    CAMERA_START_POSITION: new THREE.Vector3(4, 8, 9),
    CHICKEN_JUMP_HEIGHT: 0.5,
    CHICKEN_SPEED: 150,
    CHICKEN_HIT_SIZE: 0.783,
    CAMERA_DAMPING: 300,
    MAX_NUMBER_OF_TREES_PER_LANE: 4,
    TREE_MAX_LEAVES_HEIGHT: 1.6,
    CAR_DRIVE_SPACE_SIZE: 40,
    CAR_SIZE: 3.04,
    CAR_FRONT_FROM_ORIGIN: 1.69836,
    CAR_BACK_FROM_ORIGIN: 1.34549,
    MIN_DISTANCE_BETWEEN_CARS: 5,
    MAX_DISTANCE_BETWEEN_CARS: 15,
    MAX_NUMBER_OF_GRASS_LANES_NEXT_TO_EACH_OTHER: 2
}

export default Config;