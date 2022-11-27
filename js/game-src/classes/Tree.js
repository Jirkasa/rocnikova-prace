import * as THREE from 'three';
import { Object3D } from 'three';
import Config from '../Config';

/** Represents tree. */
class Tree {
    constructor() {
        this._trunkObject = new Object3D();
        this._leavesObject = new Object3D();

        this._trunkObject.position.y = 0.2;
        this._leavesObject.position.y = 1.2;
    }

    get verticalPosition() {
        return this._trunkObject.position.z;
    }
    set verticalPosition(value) {
        this._trunkObject.position.z = value;
        this._leavesObject.position.z = value;
    }

    get trunkMatrix() {
        this._trunkObject.updateMatrix();
        return this._trunkObject.matrix;
    }

    get leavesMatrix() {
        this._leavesObject.updateMatrix();
        return this._leavesObject.matrix;
    }

    /** Init method for object pooling. */
    init() {
        // get random scale for leaves of tree
        const scale = (
            Config.TREE_MAX_LEAVES_HEIGHT -
            Math.random() * (Config.TREE_MAX_LEAVES_HEIGHT/2)
        ) / Config.TREE_MAX_LEAVES_HEIGHT;
        // get offset to move leaves down to trunk after scale is applied
        const offset = (Config.TREE_MAX_LEAVES_HEIGHT - Config.TREE_MAX_LEAVES_HEIGHT * scale) / 2;

        this._leavesObject.scale.y = scale;
        this._leavesObject.position.y = 1.2 - offset;
    }

    /**
     * Sets position of tree based on passed tile number.
     * @param {number} tileNumber Number of tile where to position tree.
     */
    setPosition(tileNumber) {
        let position = (-Config.NUMBER_OF_TILES*Config.TILE_SIZE/2) - Config.TILE_SIZE/2 + Config.TILE_SIZE * tileNumber
        this._trunkObject.position.x = position;
        this._leavesObject.position.x = position;
    }
}

export default Tree;