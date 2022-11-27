import * as THREE from 'three';
import { Object3D } from 'three';
import Config from '../Config';

/** Represents car. */
class Car {
    constructor() {
        this._object = new Object3D();
    }

    get position() {
        return this._object.position.x;
    }
    set position(value) {
        this._object.position.x = value;
    }

    get rotation() {
        return this._object.rotation.y;
    }
    set rotation(value) {
        this._object.rotation.y = value;
    }

    get verticalPosition() {
        return this._object.position.z;
    }
    set verticalPosition(value) {
        this._object.position.z = value;
    }

    get matrix() {
        this._object.updateMatrix();
        return this._object.matrix;
    }

    /** Reset method for object pooling. */
    reset() {
        this._object.position.x = 0;
        this._object.rotation.y = 0;
    }

    /**
     * Checks whether chicken collides with car.
     * @param {number} position Position of chicken on lane.
     * @returns {boolean}
     */
    isColliding(position) {
        let carLeftPos, carRightPos;
        let chickenHitSize = Config.CHICKEN_HIT_SIZE/2;

        if (this._object.rotation.y === Math.PI) {
            carLeftPos = this._object.position.x - Config.CAR_BACK_FROM_ORIGIN;
            carRightPos = this._object.position.x + Config.CAR_FRONT_FROM_ORIGIN;
        } else {
            carLeftPos = this._object.position.x - Config.CAR_FRONT_FROM_ORIGIN;
            carRightPos = this._object.position.x + Config.CAR_BACK_FROM_ORIGIN;
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
            this._object.position.x += amount;
            if (this._object.position.x > (Config.CAR_DRIVE_SPACE_SIZE / 2)) {
                this._object.position.x -= Config.CAR_DRIVE_SPACE_SIZE;
            }
        } else {
            this._object.position.x -= amount;
            if (this._object.position.x < -(Config.CAR_DRIVE_SPACE_SIZE / 2)) {
                this._object.position.x += Config.CAR_DRIVE_SPACE_SIZE;
            }
        }
    }
}

export default Car;