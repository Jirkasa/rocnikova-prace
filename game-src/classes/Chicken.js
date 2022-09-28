import * as THREE from 'three';
import Config from '../Config';

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
    }

    /**
     * Updates position of chicken. (This method is used to synchronize movement of lanes with chicken.)
     * @param {number} amount Disntance to update position of chicken by.
     */
    updatePosition(amount) {
        this.mesh.position.z += amount;
    }

    /**
     * Updates chicken.
     * @param {number} dt Delta time.
     */
    update(dt) {

    }

    // called when signal to move left is sent from GameController
    _onControllerMoveLeft() {
        this.mesh.position.x -= Config.TILE_SIZE;
    }

    // called when signal to move right is sent from GameController
    _onControllerMoveRight() {
        this.mesh.position.x += Config.TILE_SIZE;
    }

    // called when signal to move forward is sent from GameController
    _onControllerMoveForward() {
        this.mesh.position.z -= Config.TILE_SIZE;
    }

    // called when signal to move back is sent from GameController
    _onControllerMoveBack() {
        this.mesh.position.z += Config.TILE_SIZE;
    }
}

export default Chicken;