import * as THREE from 'three';
import Config from '../Config';
import DoublyLinkedList from './DoublyLinkedList';
import Lane from './Lane';
import ObjectPool from './ObjectPool';

/** Manages lanes (moves them, checks for collision, and so on...). */
class Lanes {
    /** Creates new lanes. */
    constructor() {
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
        // materials
        this._grassMaterial = new THREE.MeshPhongMaterial({
            color: 0x53c466
        });
        this._grassSideMaterial = new THREE.MeshPhongMaterial({
            color: 0x358342
        });

        // object pools for lanes
        this._grassLanesObjectPool = new ObjectPool(
            Lane,
            [
                this._groundGeometry, this._grassMaterial,
                this._groundSideGeometry, this._grassSideMaterial
            ]
        );

        this._generateLanes();
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

            // return lane to appropriate Object Pool
            if (firstLane instanceof Lane) {
                this._grassLanesObjectPool.return(firstLane);
            }

            // create new lane
            const lastLane = this._lanes.tail.value;
            this._addRandomLane(lastLane.mesh.position.z - Config.TILE_SIZE);
        }
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

    // adds new randomly generated lane at passed position
    _addRandomLane(position) {
        // get random number
        let number = Math.floor(Math.random() * 1);
    
        // create lane based on random number
        switch (number) {
            case 0: // GRASS LANE
                const lane = this._grassLanesObjectPool.get();

                this.mesh.add(lane.mesh);
                lane.mesh.position.z = position;
                
                this._lanes.push(lane);
                break;
        }
    }
}

export default Lanes;