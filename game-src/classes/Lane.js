import * as THREE from 'three';
import Config from '../Config';

/** Represents lane (one horizontal line). */
class Lane {
    /**
     * Creates new lane.
     * @param {BufferGeometry} groundGeometry Geometry for ground.
     * @param {Material} groundMaterial Material for ground.
     * @param {BufferGeometry} groundSideGeometry Geometry for ground on sides (where player can't go).
     * @param {Material} groundSideMaterial Material for ground on sides (where player can't go).
     */
    constructor(groundGeometry, groundMaterial, groundSideGeometry, groundSideMaterial) {
        /**
         * Group of meshes contained by lane.
         * @type {Group}
         */
        this.mesh = new THREE.Group();

        this._createGround(
            groundGeometry,
            groundMaterial,
            groundSideGeometry,
            groundSideMaterial
        );
    }

    /**
     * Moves lane.
     * @param {number} amount Distance to move lane by.
     */
    move(amount) {
        this.mesh.position.z += amount;
    }

    /** init method for object pooling. */
    init() {
        this.mesh.visible = true;
    }

    /** reset method for object pooling */
    reset() {
        this.mesh.visible = false;
    }

    // creates ground for lane
    _createGround(groundGeometry, groundMaterial, groundSideGeometry, groundSideMaterial) {
        // create middle ground
        const ground = new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );
        ground.rotateX(-Math.PI / 2);
        // create ground for left side (where player can't go)
        const leftSideGround = new THREE.Mesh(
            groundSideGeometry,
            groundSideMaterial
        );
        leftSideGround.position.x = - (
            (Config.SIDE_GROUND_SIZE / 2) + (Config.NUMBER_OF_TILES * Config.TILE_SIZE)/2
        );
        leftSideGround.rotateX(-Math.PI / 2);
        // create ground for right side (where player can't go)
        const rightSideGround = new THREE.Mesh(
            groundSideGeometry,
            groundSideMaterial
        );
        rightSideGround.position.x = (
            (Config.SIDE_GROUND_SIZE / 2) + (Config.NUMBER_OF_TILES * Config.TILE_SIZE)/2
        );
        rightSideGround.rotateX(-Math.PI / 2);

        // add created grounds to group
        this.mesh.add(ground, leftSideGround, rightSideGround);
    }

    /**
     * Determines whether tile is empty.
     * @param {number} tileNumber Number of tile to check whether it is empty.
     * @returns {boolean}
     */
    isTileEmpty(tileNumber) {
        return true;
    }
}

export default Lane;