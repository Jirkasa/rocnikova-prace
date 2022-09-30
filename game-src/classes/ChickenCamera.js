import * as THREE from 'three';
import Config from "../Config";

/** Represents camera following chicken (kind of). */
class ChickenCamera {
    /**
     * Creates new chicken camera.
     * @param {Chicken} chicken Chicken to be followed by camera.
     * @param {number} aspectRatio Aspect ratio of camera.
     */
    constructor(chicken, aspectRatio) {
        // create camera
        this.camera = new THREE.PerspectiveCamera(40, aspectRatio, 0.1, 500);
        // set camera start position
        this.camera.position.x = Config.CAMERA_START_POSITION.x;
        this.camera.position.y = Config.CAMERA_START_POSITION.y;
        this.camera.position.z = Config.CAMERA_START_POSITION.z;
        this.camera.lookAt(0, 0.7, 0);

        this._chicken = chicken;
    }

    /**
     * Updates chicken camera. This method has to be called multiple times per frame.
     */
    update() {
        // move camera horizontally based on position of chicken
        this.camera.position.x = (
            Config.CAMERA_START_POSITION.x + this._chicken.mesh.position.x
        );
    }

    /**
     * Resizes camera.
     * @param {number} aspectRatio Aspect ratio to set on camera.
     */
    resize(aspectRatio) {
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();
    }
}

export default ChickenCamera;