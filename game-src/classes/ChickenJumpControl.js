import Config from "../Config";

/** Controls jumping of chicken. */
class ChickenJumpControl {
    /**
     * Creates new chicken jump control.
     * @param {Chicken} chicken Chicken to control jumping for.
     * @param {number} jumpTime How much time does it take to jump.
     */
    constructor(chicken, jumpTime) {
        /**
         * Indicates whether chicken is jumping.
         * @type {boolean}
         */
        this.isJumping = false;

        this._chickenMesh = chicken.mesh;
        this._jumpTime = jumpTime;

        this._step = 0;
    }

    /**
     * Updates chicken jump control.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this.isJumping) return;

        this._chickenMesh.position.y += this._step * dt;

        // if chicken has reached height limit for jumping, it will move down.
        if (this._chickenMesh.position.y >= Config.CHICKEN_JUMP_HEIGHT) {
            this._chickenMesh.position.y -= this._chickenMesh.position.y - Config.CHICKEN_JUMP_HEIGHT;
            this._step = -this._step;
        }

        // if chicken got back down to floor, jumping is finished.
        if (this._chickenMesh.position.y <= 0) {
            this._chickenMesh.position.y = 0;
            this.isJumping = false;
        }
    }

    /**
     * Performs jump.
     */
    jump() {
        if (this.isJumping) {
            this._step = (Config.CHICKEN_JUMP_HEIGHT + Config.CHICKEN_JUMP_HEIGHT-this._chickenMesh.position.y) / this._jumpTime;
        } else {
            this._step = (Config.CHICKEN_JUMP_HEIGHT * 2) / this._jumpTime;
        }


        this.isJumping = true;
    }
}

export default ChickenJumpControl;