import * as THREE from 'three';
import Config from '../Config';

/** Represents car. */
class Car {
    /**
     * Creates new car.
     * @param {BufferGeometry} geometry Geometry of car.
     * @param {Material} material Material of car.
     */
    constructor(geometry, material) {
        /**
         * Mesh of car.
         * @type {Mesh}
         */
        this.mesh = new THREE.Mesh(geometry, material);
    }

    /** Reset method for object pooling. */
    reset() {
        this.mesh.position.x = 0;
        this.mesh.rotation.y = 0;
    }

    /**
     * Checks whether chicken collides with car.
     * @param {number} position Position of chicken on lane.
     * @returns {boolean}
     */
    isColliding(position) {
        let carLeftPos, carRightPos;
        let chickenHitSize = Config.CHICKEN_HIT_SIZE/2;

        if (this.mesh.rotation.y === Math.PI) {
            carLeftPos = this.mesh.position.x - Config.CAR_BACK_FROM_ORIGIN;
            carRightPos = this.mesh.position.x + Config.CAR_FRONT_FROM_ORIGIN;
        } else {
            carLeftPos = this.mesh.position.x - Config.CAR_FRONT_FROM_ORIGIN;
            carRightPos = this.mesh.position.x + Config.CAR_BACK_FROM_ORIGIN;
        }

        return (
            (position + chickenHitSize > carLeftPos && position + chickenHitSize < carRightPos)
            ||
            (position - chickenHitSize < carRightPos && position - chickenHitSize > carLeftPos)
        );
    }

    /**
     * Moves car.
     * @param {number} amount Amount to move car by.
     * @param {boolean} toRight Determines whether to move right instead of left.
     */
    move(amount, toRight) {
        if (toRight) {
            this.mesh.position.x += amount;
            if (this.mesh.position.x > (Config.CAR_DRIVE_SPACE_SIZE / 2)) {
                this.mesh.position.x -= Config.CAR_DRIVE_SPACE_SIZE;
            }
            
        } else {
            this.mesh.position.x -= amount;
            if (this.mesh.position.x < -(Config.CAR_DRIVE_SPACE_SIZE / 2)) {
                this.mesh.position.x += Config.CAR_DRIVE_SPACE_SIZE;
            }
        }
    }
}

export default Car;