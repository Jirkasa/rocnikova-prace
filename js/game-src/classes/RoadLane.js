import Config from "../Config";
import Lane from "./Lane";

/**
 * Represents road lane.
 * @extends Lane
 */
class RoadLane extends Lane {
    /**
     * Creates new road lane.
     * @param {ObjectPool} carsObjectPool Object pool for cars.
     */
    constructor(carsObjectPool) {
        super();
        this._carsObjectPool = carsObjectPool;
        this._cars = [];
        this._toRight = false;
    }

    update(dt) {
        for (let car of this._cars) {
            car.move(dt*0.004, this._toRight);
        }
    }

    move(amount) {
        super.move(amount);
        for (let car of this._cars) {
            car.verticalPosition = this._object.position.z;
        }
    }

    render(instancedMeshesRenderer) {
        this._object.updateMatrix();
        this._leftSideObject.updateMatrix();
        this._rightSideObject.updateMatrix();

        instancedMeshesRenderer.setRoad(this._object.matrix, this._leftSideObject.matrix, this._rightSideObject.matrix);

        for (let car of this._cars) {
            instancedMeshesRenderer.setCar(car.matrix);
        }
    }

    isColliding(xPosition) {
        for (let car of this._cars) {
            if (car.isColliding(xPosition)) return true;
        }
        return false;
    }

    /** Initializes lane. */
    init(position) {
        super.init(position);

        // get random values to generate cars
        let spaceBetweenCars = Math.random() * Config.MAX_DISTANCE_BETWEEN_CARS + Config.MIN_DISTANCE_BETWEEN_CARS + Config.CAR_SIZE;
        let offset = Math.random() * 3;
        this._toRight = Math.random() > 0.5;
        
        let maxPos = Config.CAR_DRIVE_SPACE_SIZE / 2;
        // generate cars
        for (let currentPos = -maxPos + offset; currentPos <= maxPos-spaceBetweenCars; currentPos += spaceBetweenCars) {
            const car = this._carsObjectPool.get();
            car.position = currentPos;
            if (this._toRight) {
                car.rotation = Math.PI;
            }
            this._cars.push(car);
            car.verticalPosition = this._object.position.z;
        }
    }

    /** Reset method for object pooling. */
    reset() {
        // delete all cars (return to object pool)
        while (this._cars.length > 0) {
            const car = this._cars.pop();
            this._carsObjectPool.return(car);
        }
    }
}

export default RoadLane;