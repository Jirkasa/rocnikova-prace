/** Used to smoothly change rotation of object. */
class RotationChanger {
    /**
     * Creates new rotation changer.
     * @param {Object3D} object Object to control rotation for.
     * @param {string} axis Axis to control rotation on.
     * @param {number} changeTime How much time does it take to change rotation.
     */
    constructor(object, axis, changeTime) {
        /**
         * Indicates whether rotation is being changed.
         * @type {boolean}
         */
        this.isBeingChanged = false;

        this._object = object;
        this._axis = axis;
        this._changeTime = changeTime;

        this._currentRotation = 0;
        this._endRotation = 0;
        this._step = 0;
    }

    /**
     * Updates rotation changer. This method has to be called multiple times per frame for smooth rotation change.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this.isBeingChanged) return;

        this._object.rotation[this._axis] += this._step * dt;
        this._currentRotation += this._step * dt;

        if (
            (this._step < 0 && this._currentRotation <= this._endRotation)
            ||
            (this._step > 0 && this._currentRotation >= this._endRotation) 
        ) {
            this._object.rotation[this._axis] -= this._currentRotation - this._endRotation;
            this.isBeingChanged = false;
        }
    }

    /**
     * Sets new rotation.
     * @param {number} angle Angle of new rotation.
     */
    setRotation(angle) {
        if (angle < 0) {
            angle = (Math.PI * 2) + angle;
        }
        let targetRotation = angle % (Math.PI * 2);
        let currentRotation = this._object.rotation[this._axis] % (Math.PI * 2);

        let distance = targetRotation > currentRotation
        ? targetRotation - currentRotation
        : currentRotation - targetRotation;

        let toLeft;

        // get shorter distance to target rotation and
        // figure out whether to move left or right
        if (distance > Math.PI) {
            distance = (Math.PI * 2) - distance;
            if (targetRotation > currentRotation) {
                toLeft = false;
            } else {
                toLeft = true;
            }
        } else {
            if (targetRotation > currentRotation) {
                toLeft = true;
            } else {
                toLeft = false;
            }
        }

        if (!toLeft) {
            distance = -distance;
        }

        this._endRotation = distance;
        this._currentRotation = 0;

        this._step = distance / this._changeTime;
        
        this.isBeingChanged = true;
    }
}

export default RotationChanger;