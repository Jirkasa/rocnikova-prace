import * as THREE from 'three';
import Config from '../Config';
import Car from './Car';
import DoublyLinkedList from './DoublyLinkedList';
import GrassLane from './GrassLane';
import Lane from './Lane';
import ObjectPool from './ObjectPool';
import RoadLane from './RoadLane';
import Tree from './Tree';

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

        // lanes are stored in doubly linked list
        // (They have to be added to the end and removed from beginning.)
        this._lanes = new DoublyLinkedList();

        // geometries
        this._groundGeometry = new THREE.PlaneGeometry(Config.NUMBER_OF_TILES * Config.TILE_SIZE, Config.TILE_SIZE);
        this._groundSideGeometry = new THREE.PlaneGeometry(Config.SIDE_GROUND_SIZE, Config.TILE_SIZE);
        this._treeTrunkGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        this._treeLeavesGeometry = new THREE.BoxGeometry(0.9, 1.6, 0.9);
        this._carGeometry = assets.getAsset("Car Model").scene.children[0].geometry;
        // materials
        this._grassMaterial = new THREE.MeshPhongMaterial({
            color: 0x53c466
        });
        this._grassSideMaterial = new THREE.MeshPhongMaterial({
            color: 0x358342
        });
        this._roadMaterial = new THREE.MeshPhongMaterial({
            color: 0x40403e
        });
        this._roadSideMaterial = new THREE.MeshPhongMaterial({
            color: 0x262625
        });
        this._treeTrunkMaterial = new THREE.MeshPhongMaterial({
            color: 0x5e4617
        });
        this._treeLeavesMaterial = new THREE.MeshPhongMaterial({
            color: 0x229a36
        });
        this._carMaterial = new THREE.MeshPhongMaterial({
            vertexColors: true
        });

        // object pools
        this._treesObjectPool = new ObjectPool(
            Tree,
            [
                this._treeTrunkGeometry, this._treeTrunkMaterial,
                this._treeLeavesGeometry, this._treeLeavesMaterial
            ]
        );
        this._carsObjectPool = new ObjectPool(
            Car,
            [
                this._carGeometry,
                this._carMaterial
            ]
        )
        this._grassLanesObjectPool = new ObjectPool(
            GrassLane,
            [
                this._groundGeometry, this._grassMaterial,
                this._groundSideGeometry, this._grassSideMaterial,
                this._treesObjectPool
            ]
        );
        this._roadLanesObjectPool = new ObjectPool(
            RoadLane,
            [
                this._groundGeometry, this._roadMaterial,
                this._groundSideGeometry, this._roadSideMaterial,
                this._carsObjectPool
            ]
        );

        this._generateLanes();

        this._currentXTile = Math.ceil(Config.NUMBER_OF_TILES / 2);
        this._currentLaneNode = this._getStartLane();
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
        if (firstLane.mesh.position.z > Config.MAX_LANE_POSITION) {
            // first lane is removed from linked list
            this._lanes.shift();

            // return removed lane to appropriate Object Pool
            if (firstLane instanceof GrassLane) {
                this._grassLanesObjectPool.return(firstLane);
            } else if (firstLane instanceof RoadLane) {
                this._roadLanesObjectPool.return(firstLane);
            }

            // create new lane
            const lastLane = this._lanes.tail.value;
            this._addRandomLane(lastLane.mesh.position.z - Config.TILE_SIZE);
        }
    }

    /**
     * Updates lanes.
     * @param {number} dt Delta time.
     */
    update(dt) {
        let node = this._lanes.head;
        while (node) {
            node.value.update(dt);
            node = node.next;
        }
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
        for (let i = 0; i < Config.NUMBER_OF_VISIBLE_LANES; i++) {
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
            if (node.value.mesh.position.z === 0) return node;
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
                lane = this._grassLanesObjectPool.get();

                this.mesh.add(lane.mesh);
                lane.mesh.position.z = position;
                
                this._lanes.push(lane);
                break;
            case 1: // ROAD LANE
                lane = this._roadLanesObjectPool.get();

                this.mesh.add(lane.mesh);
                lane.mesh.position.z = position;
                
                this._lanes.push(lane);
                break;
        }
    }
}

export default Lanes;