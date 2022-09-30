import * as THREE from 'three';
import Config from '../Config';
import ChickenJumpControl from './ChickenJumpControl';
import PositionChanger from './PositionChanger';
import RotationChanger from './RotationChanger';

/** Represents chicken (which is controlled by player in game). */
class Chicken {
    /**
     * Creates new chicken.
     * @param {Assets} assets Loaded assets.
     * @param {GameController} gameController Game controller to be used to control chicken.
     */
    constructor(assets, gameController) {
        // get mesh from loaded assets
        this.mesh = assets.getAsset("Chicken Model").scene.children[0];
        // change material
        this.mesh.material = new THREE.MeshPhongMaterial({
            vertexColors: true
        });

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
        this._rotationChanger.update(dt);
        this._chickenJumpControl.update(dt);
    }

    // called when signal to move left is sent from GameController
    _onControllerMoveLeft() {
        this._xPosChanger.addPosition(-Config.TILE_SIZE);
        this._rotationChanger.setRotation(-Math.PI/2);
        this._chickenJumpControl.jump();
    }

    // called when signal to move right is sent from GameController
    _onControllerMoveRight() {
        this._xPosChanger.addPosition(Config.TILE_SIZE);
        this._rotationChanger.setRotation(Math.PI/2);
        this._chickenJumpControl.jump();
    }

    // called when signal to move forward is sent from GameController
    _onControllerMoveForward() {
        this._zPosChanger.addPosition(-Config.TILE_SIZE);
        this._rotationChanger.setRotation(Math.PI);
        this._chickenJumpControl.jump();
    }

    // called when signal to move back is sent from GameController
    _onControllerMoveBack() {
        this._zPosChanger.addPosition(Config.TILE_SIZE);
        this._rotationChanger.setRotation(0);
        this._chickenJumpControl.jump();
    }
}

export default Chicken;