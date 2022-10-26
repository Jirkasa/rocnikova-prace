import Config from "../Config";
import Lane from "./Lane";

/**
 * Represents grass lane.
 * @extends Lane
 */
class GrassLane extends Lane {
    /**
     * Creates new grass lane.
     * @param {BufferGeometry} groundGeometry Geometry for ground.
     * @param {Material} groundMaterial Material for ground.
     * @param {BufferGeometry} groundSideGeometry Geometry for ground on sides (where player can't go).
     * @param {Material} groundSideMaterial Material for ground on sides (where player can't go).
     * @param {ObjectPool} treesObjectPool Object pool for trees.
     */
    constructor(groundGeometry, groundMaterial, groundSideGeometry, groundSideMaterial, treesObjectPool) {
        super(groundGeometry, groundMaterial, groundSideGeometry, groundSideMaterial);

        this._treesObjectPool = treesObjectPool;
        this._trees = new Map();
    }

    /** Init method for object pooling. */
    init() {
        super.init();

        // generate random number of trees
        let numberOfTrees = Math.trunc(Math.random() * (Config.MAX_NUMBER_OF_TREES_PER_LANE+1));

        // generate trees
        for (let i = 0; i < numberOfTrees; i++) {
            // generate random number in range of number of empty tiles on lane
            let tileNum = Math.trunc(Math.random() * (Config.NUMBER_OF_TILES - this._trees.size)) + 1;

            // get position of tree
            let treeTilePos;
            for (let j = 1, current = 0; j <= Config.NUMBER_OF_TILES; j++) {
                if (!this._trees.has(j)) current++;

                if (current === tileNum) {
                    treeTilePos = j;
                    break;
                }
            }

            // get tree
            const tree = this._treesObjectPool.get();
            tree.setPosition(treeTilePos);

            // add tree to scene and store
            this.mesh.add(tree.mesh);
            this._trees.set(treeTilePos, tree);
        }
    }

    /** Reset method for object pooling. */
    reset() {
        super.reset();
        // delete (return) all trees
        for (let [key, tree] of this._trees.entries()) {
            this.mesh.remove(tree.mesh);
            this._treesObjectPool.return(tree);
            this._trees.delete(key);
        }
    }

    /**
     * Determines whether tile is empty.
     * @param {number} tileNumber Number of tile to check whether it is empty.
     * @returns {boolean}
     */
    isTileEmpty(tileNumber) {
        return !this._trees.has(tileNumber);
    }
}

export default GrassLane;