import { Object3D } from 'three';
import Config from '../Config';

/** Represents lane (one horizontal line). */
class Lane {
    /**
     * Creates new lane.
     */
    constructor() {
        // 3D objects representing ground (middle, left, right)
        this._object = new Object3D();
        this._leftSideObject = new Object3D();
        this._rightSideObject = new Object3D();

        this._object.rotateX(-Math.PI / 2);
        this._leftSideObject.rotateX(-Math.PI / 2);
        this._rightSideObject.rotateX(-Math.PI / 2);

        this._leftSideObject.position.x = - (
            (Config.SIDE_GROUND_SIZE / 2) + (Config.NUMBER_OF_TILES * Config.TILE_SIZE)/2
        );
        this._rightSideObject.position.x = (
            (Config.SIDE_GROUND_SIZE / 2) + (Config.NUMBER_OF_TILES * Config.TILE_SIZE)/2
        );
    }

    /**
     * Position of lane (position on Z axis in Three.js scene).
     * @type {number}
     */
    get position() {
        return this._object.position.z;
    }

    set position(value) {
        this._object.position.z = value;
        this._leftSideObject.position.z = value;
        this._rightSideObject.position.z = value;
    }

    /**
     * Moves lane.
     * @param {number} amount Distance to move lane by.
     */
    move(amount) {
        this._object.position.z += amount;
        this._leftSideObject.position.z += amount;
        this._rightSideObject.position.z += amount;
    }

    /** Updates lane. */
    update(dt) {}

    /**
     * Updates instance of instanced mesh.
     * @param {InstancedMeshesRenderer} instancedMeshesRenderer InstancedMeshesRender that should be used to update instance of instanced mesh.
     */
    render(instancedMeshesRenderer) {
        this._object.updateMatrix();
        this._leftSideObject.updateMatrix();
        this._rightSideObject.updateMatrix();

        instancedMeshesRenderer.setGrass(this._object.matrix, this._leftSideObject.matrix, this._rightSideObject.matrix);
    }

    /**
     * Determines whether tile is empty.
     * @param {number} tileNumber Number of tile to check whether it is empty.
     * @returns {boolean}
     */
     isTileEmpty(tileNumber) {
        return true;
    }

    /**
     * Checks whether chicken is colliding.
     * @param {number} xPosition X position of chicken.
     * @returns {boolean}
     */
    isColliding(xPosition) {
        return false;
    }

    /** Initializes lane. */
    init(position) {
        this.position = position;
    }
}

export default Lane;