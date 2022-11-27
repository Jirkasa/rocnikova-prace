import * as THREE from 'three';
import Config from '../Config';
import ChickenJumpControl from './ChickenJumpControl';
import PositionChanger from './PositionChanger';
import RotationChanger from './RotationChanger';
import EventSource from './utils/EventSource';

/** Represents chicken (which is controlled by player in game). */
class Chicken {
    /**
     * Creates new chicken.
     * @param {Assets} assets Loaded assets.
     * @param {Lanes} lanes Lanes.
     * @param {GameController} gameController Game controller to be used to control chicken.
     */
    constructor(assets, lanes, gameController) {
        /**
         * Mesh with chicken model.
         * @type {Mesh}
         */
        this.mesh = assets.getAsset("Chicken Model").scene.children[0];
        // change material
        this.mesh.material = new THREE.MeshPhongMaterial({
            vertexColors: true
        });
        this.canMove = false;

        this.onDead = new EventSource();

        this._isDead = false;

        /**
         * Dead sound for chicken.
         * @type {Audio}
         */
        this.deadSound = null;
        /**
         * Move sounds for chicken.
         * @type {Array<Audio>}
         */
        this.sounds = null;
        this._currentSoundIdx = 0;

        this._lanes = lanes;

        // subscribe to events of GameController
        gameController.onMoveLeft.subscribe(() => this._onControllerMoveLeft());
        gameController.onMoveRight.subscribe(() => this._onControllerMoveRight());
        gameController.onMoveForward.subscribe(() => this._onControllerMoveForward());
        gameController.onMoveBack.subscribe(() => this._onControllerMoveBack());

        // changers to smoothly set position and rotation of chicken
        this._xPosChanger = new PositionChanger(this.mesh, "x", Config.CHICKEN_SPEED);
        this._zPosChanger = new PositionChanger(this.mesh, "z", Config.CHICKEN_SPEED);
        this._rotationChanger = new RotationChanger(this.mesh, "y", Config.CHICKEN_SPEED);

        this._chickenJumpControl = new ChickenJumpControl(this, Config.CHICKEN_SPEED);
    }

    reset() {
        this._isDead = false;
        this.mesh.position.set(0, 0, 0);
        this.mesh.scale.set(1, 1, 1);
    }

    /**
     * Updates position of chicken. (This method is used to synchronize movement of lanes with chicken.)
     * @param {number} amount Distance to update position of chicken by.
     */
    updatePosition(amount) {
        this.mesh.position.z += amount;
    }

    /**
     * Updates chicken.
     * @param {number} dt Delta time.
     */
    update(dt) {
        this._xPosChanger.update(dt);
        this._zPosChanger.update(dt);

        if (this._isDead) return;

        this._rotationChanger.update(dt);
        this._chickenJumpControl.update(dt);

        if (this._lanes.isColliding(this.mesh.position.x)) {
            if (this.deadSound) this.deadSound.play();
            this._isDead = true;
            this.mesh.scale.y = 0.01;

            this.onDead.fire(this, false);
        }

        if (this.mesh.position.z > 7) {
            this._isDead = true;
            this.onDead.fire(this, true);
        }
    }

    // called when signal to move left is sent from GameController
    _onControllerMoveLeft() {
        if (this._isDead || !this.canMove) return;

        this._rotationChanger.setRotation(-Math.PI/2);

        if (!this._lanes.canMoveLeft) return;
        this._lanes.moveLeft();
        this._playMoveSound();

        this._xPosChanger.addPosition(-Config.TILE_SIZE);
        this._chickenJumpControl.jump();
    }

    // called when signal to move right is sent from GameController
    _onControllerMoveRight() {
        if (this._isDead || !this.canMove) return;

        this._rotationChanger.setRotation(Math.PI/2);

        if (!this._lanes.canMoveRight) return;
        this._lanes.moveRight();
        this._playMoveSound();

        this._xPosChanger.addPosition(Config.TILE_SIZE);
        this._chickenJumpControl.jump();
    }

    // called when signal to move forward is sent from GameController
    _onControllerMoveForward() {
        if (this._isDead || !this.canMove) return;

        this._rotationChanger.setRotation(Math.PI);

        if (!this._lanes.canMoveForward) return;
        this._lanes.moveForward();
        this._playMoveSound();

        this._zPosChanger.addPosition(-Config.TILE_SIZE);
        this._chickenJumpControl.jump();
    }

    // called when signal to move back is sent from GameController
    _onControllerMoveBack() {
        if (this._isDead || !this.canMove) return;

        this._rotationChanger.setRotation(0);

        if (!this._lanes.canMoveBack) return;
        this._lanes.moveBack();
        this._playMoveSound();

        this._zPosChanger.addPosition(Config.TILE_SIZE);
        this._chickenJumpControl.jump();
    }

    // plays move sound for chicken
    _playMoveSound() {
        if (!this.sounds) return;

        this.sounds[this._currentSoundIdx].play();

        this._currentSoundIdx++;
        if (this._currentSoundIdx === this.sounds.length) this._currentSoundIdx = 0;
    }
}

export default Chicken;