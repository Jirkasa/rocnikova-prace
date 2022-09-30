import * as THREE from 'three';
import Config from '../Config';

/** Represents tree. */
class Tree {
    /**
     * Creates new tree.
     * @param {BufferGeometry} trunkGeometry Geometry for trunk of tree.
     * @param {Material} trunkMaterial Material for trunk of tree.
     * @param {BufferGeometry} leavesGeometry Geometry for leaves of tree.
     * @param {Material} leavesMaterial Material for leaves of tree.
     */
    constructor(trunkGeometry, trunkMaterial, leavesGeometry, leavesMaterial) {
        /**
         * Three.js group representing tree.
         * @type {Group}
         */
        this.mesh = new THREE.Group();

        // create trunk
        const trunk = new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );
        trunk.position.y = 0.2;
        // create leaves
        this._leaves = new THREE.Mesh(
            leavesGeometry,
            leavesMaterial
        );
        this._leaves.position.y = 1.2;
        // add trunk and leaves to group
        this.mesh.add(trunk, this._leaves);
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

        this._leaves.scale.y = scale;
        this._leaves.position.y = 1.2 - offset;
    }

    /**
     * Sets position of tree based on passed tile number.
     * @param {number} tileNumber Number of tile where to position tree.
     */
    setPosition(tileNumber) {
        this.mesh.position.x = (-Config.NUMBER_OF_TILES*Config.TILE_SIZE/2) - Config.TILE_SIZE/2 + Config.TILE_SIZE * tileNumber;
        // TODO - ty stromky mohou zablokovat cestu úplně, takže to nějak pořešit
    }
}

export default Tree;