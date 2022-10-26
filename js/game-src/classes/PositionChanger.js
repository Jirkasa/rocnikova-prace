/** Used to smoothly change position of object. */
class PositionChanger {
    /**
     * Creates new position changer.
     * @param {Object3D} object Object to control position for.
     * @param {string} axis Axis to control position on.
     * @param {number} changeTime How much time does it take to change position.
     */
    constructor(object, axis, changeTime) {
        /**
         * Indicates whether position is being changed.
         * @type {boolean}
         */
        this.isBeingChanged = false;

        this._object = object;
        this._axis = axis;
        this._changeTime = changeTime;

        // variables needed to smoothly change position
        this._currentPos = 0;
        this._endPos = 0;
        this._step = 0;
    }

    /**
     * Updates position changer. This method has to be called multiple times per frame for smooth position change.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this.isBeingChanged) return;

        this._object.position[this._axis] += this._step * dt;
        this._currentPos += this._step * dt;
        
        if (
            (this._step < 0 && this._currentPos <= this._endPos)
            ||
            (this._step > 0 && this._currentPos >= this._endPos) 
        ) {
            this._object.position[this._axis] -= this._currentPos - this._endPos;
            this.isBeingChanged = false;
        }
    }

    /**
     * Moves object by passed amount.
     * @param {number} amount Value to move object by.
     */
    addPosition(amount) {
        if (this.isBeingChanged) {
            this._endPos += amount;
        } else {
            this._endPos = amount;
            this._currentPos = 0;
        }
        this._step = (this._endPos - this._currentPos) / this._changeTime;
        this.isBeingChanged = true;
    }
}

export default PositionChanger;