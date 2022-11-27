import * as THREE from 'three';
import Config from '../Config';
import Car from './lanes/Car';
import DoublyLinkedList from './data-structures/DoublyLinkedList';
import GrassLane from './lanes/GrassLane';
import InstancedMeshesRenderer from './utils/InstancedMeshesRenderer';
import Lane from './lanes/Lane';
import ObjectPool from './utils/ObjectPool';
import RoadLane from './lanes/RoadLane';
import Tree from './lanes/Tree';

/** Manages lanes (moves them, checks for collision, and so on...). */
class Lanes {
    /**
     * Creates new lanes.
     * @param {Assets} assets Loaded assets.
     */
    constructor(assets) {
        /**
         * Group containing lanes.
         * @type {Group}
         */
        this.mesh = new THREE.Group();

        // used to render lanes (update instanced meshes)
        this._instancedMeshesRenderer = new InstancedMeshesRenderer(assets, this.mesh);

        // lanes are stored in doubly linked list
        // (They have to be added to the end and removed from beginning.)
        this._lanes = new DoublyLinkedList();

        // object pools for reusing of objects
        this._treesObjectPool = new ObjectPool(Tree);
        this._carsObjectPool = new ObjectPool(Car);
        this._grassLanesObjectPool = new ObjectPool(GrassLane, [this._treesObjectPool]);
        this._emptyGrassLanesObjectPool = new ObjectPool(Lane);
        this._roadLanesObjectPool = new ObjectPool(RoadLane, [this._carsObjectPool]);
        this._generateLanes();

        // determines at which tile is player currently located
        this._currentXTile = Math.ceil(Config.NUMBER_OF_TILES / 2);
        // determines at what lane is player currently located
        this._currentLaneNode = this._getStartLane();

        // used to keep track of how many grass lanes there are next to each other
        // - there can be just two grass lanes (with trees) next
        // to each other, otherwise road might be blocked
        this._numberOfGrassLanes = 0;
    }

    /**
     * Moves lanes.
     * @param {number} amount Distance to move lanes by.
     */
    move(amount) {
        if (this._lanes.length === 0) return;

        // move all lanes
        let node = this._lanes.head;
        while (node) {
            const lane = node.value;
            lane.move(amount);
            node = node.next;
        }

        let firstLane = this._lanes.head.value;
        // if first lane is after MAX_LANE_POSITION
        // it is removed and new lane is generated
        if (firstLane.position > Config.MAX_LANE_POSITION) {
            // first lane is removed from linked list
            this._lanes.shift();

            // return removed lane to appropriate Object Pool
            if (firstLane instanceof GrassLane) {
                this._grassLanesObjectPool.return(firstLane);
            } else if (firstLane instanceof RoadLane) {
                this._roadLanesObjectPool.return(firstLane);
            } else if (firstLane instanceof Lane) {
                this._emptyGrassLanesObjectPool.return(firstLane);
            }

            // create new lane
            const lastLane = this._lanes.tail.value;
            this._addRandomLane(lastLane.position - Config.TILE_SIZE);
        }
    }

    /**
     * Updates lanes.
     * @param {number} dt Delta time.
     */
    update(dt) {
        // update every lane
        let node = this._lanes.head;
        while (node) {
            node.value.update(dt);
            node = node.next;
        }
    }

    /**
     * Updates instanced meshes, so lanes can be properly rendered. This method should be called before every rendering.
     */
    updateInstancedMeshes() {
        this._instancedMeshesRenderer.begin();

        // call render method of each lane to update instanced meshes
        let node = this._lanes.head;
        while (node) {
            node.value.render(this._instancedMeshesRenderer);
            node = node.next;
        }

        this._instancedMeshesRenderer.finish();
    }

    /**
     * Indicates whether chicken can move left.
     * @type {boolean}
     */
    get canMoveLeft() {
        if (this._currentXTile === 1) return false;
        if (this._currentLaneNode.value.isTileEmpty(this._currentXTile-1)) return true;
        return false;
    }

    /**
     * Indicates whether chicken can move right.
     * @type {boolean}
     */
    get canMoveRight() {
        if (this._currentXTile === Config.NUMBER_OF_TILES) return false;
        if (this._currentLaneNode.value.isTileEmpty(this._currentXTile+1)) return true;
        return false;
    }

    /**
     * Indicates whether chicken can move forward.
     * @type {boolean}
     */
    get canMoveForward() {
        if (this._currentLaneNode.next.value.isTileEmpty(this._currentXTile)) return true;
        return false;
    }

    /**
     * Indicates whether chicken can move back.
     * @type {boolean}
     */
    get canMoveBack() {
        if (this._currentLaneNode.prev.value.isTileEmpty(this._currentXTile)) return true;
        return false;
    }

    /**
     * Moves left.
     */
    moveLeft() {
        this._currentXTile--;
    }

    /**
     * Moves right.
     */
    moveRight() {
        this._currentXTile++;
    }

    /**
     * Moves forward.
     */
    moveForward() {
        this._currentLaneNode = this._currentLaneNode.next;
    }

    /**
     * Moves back.
     */
    moveBack() {
        this._currentLaneNode = this._currentLaneNode.prev;
    }

    /**
     * Checks whether chicken is colliding.
     * @param {number} xPosition Position of chicken on X axis.
     * @returns {boolean}
     */
    isColliding(xPosition) {
        return this._currentLaneNode.value.isColliding(xPosition);
    }

    // generates lanes (used at start of game)
    _generateLanes() {
        // generate grass lanes (normal lanes without trees) up to chicken start position
        for (let i = 0; i < Config.NUMBER_OF_VISIBLE_LANES/2+1; i++) {
            let lane = this._emptyGrassLanesObjectPool.get();
            lane.init(-i * Config.TILE_SIZE + (Config.NUMBER_OF_VISIBLE_LANES/2 *Config.TILE_SIZE));
            this._lanes.push(lane);
        }
        // generate random lanes after chicken position
        for (let i = Config.NUMBER_OF_VISIBLE_LANES/2+1; i < Config.NUMBER_OF_VISIBLE_LANES; i++) {
            this._addRandomLane(
                -i * Config.TILE_SIZE
                + (Config.NUMBER_OF_VISIBLE_LANES/2 *Config.TILE_SIZE)
            );
        }
    }

    // returns start lane (lane at position 0)
    _getStartLane() {
        let node = this._lanes.head;
        while (node) {
            if (node.value.position === 0) return node;
            node = node.next;
        }
    }

    // adds new randomly generated lane at passed position
    _addRandomLane(position) {
        // get random number
        let number = Math.floor(Math.random() * 2);
    
        // create lane based on random number
        let lane;
        switch (number) {
            case 0: // GRASS LANE
                // generate grass lane with or without trees
                // (only two grass lanes with trees can be next to each other)
                if (this._numberOfGrassLanes === Config.MAX_NUMBER_OF_GRASS_LANES_NEXT_TO_EACH_OTHER) {
                    lane = this._emptyGrassLanesObjectPool.get();
                    this._numberOfGrassLanes = 0;
                } else {
                    lane = this._grassLanesObjectPool.get();
                    this._numberOfGrassLanes++;
                }
                break;
            case 1: // ROAD LANE
                lane = this._roadLanesObjectPool.get();
                this._numberOfGrassLanes = 0;
                break;
        }

        lane.init(position);
        this._lanes.push(lane);
    }
}

export default Lanes;