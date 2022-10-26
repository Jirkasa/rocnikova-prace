import * as THREE from 'three';
import Config from "../Config";

/** Represents camera following chicken (kind of). */
class ChickenCamera {
    /**
     * Creates new chicken camera.
     * @param {Chicken} chicken Chicken to be followed by camera.
     * @param {Lanes} lanes Lanes to control camera position on Z axis.
     * @param {number} aspectRatio Aspect ratio of camera.
     */
    constructor(chicken, lanes, aspectRatio) {
        /**
         * Three.js camera.
         * @type {PerspectiveCamera}
         */
        this.camera = new THREE.PerspectiveCamera(40, aspectRatio, 0.1, 500);
        // set camera start position
        this.camera.position.x = Config.CAMERA_START_POSITION.x;
        this.camera.position.y = Config.CAMERA_START_POSITION.y;
        this.camera.position.z = Config.CAMERA_START_POSITION.z;
        this.camera.lookAt(0, 0.7, 0);

        /**
         * Three.js audio listener.
         * @type {AudioListener}
         */
        this.audioListener = new THREE.AudioListener();
        this.camera.add(this.audioListener);

        this._chicken = chicken;
        this._lanes = lanes;
    }

    /**
     * Updates chicken camera. This method has to be called multiple times per frame.
     */
    update(dt) {
        // move camera horizontally based on position of chicken
        this.camera.position.x = (
            Config.CAMERA_START_POSITION.x + this._chicken.mesh.position.x
        );

        if (this._chicken.mesh.position.z < 0) {
            this._lanes.move(-this._chicken.mesh.position.z*dt/Config.CAMERA_DAMPING);
            this._chicken.updatePosition(-this._chicken.mesh.position.z*dt/Config.CAMERA_DAMPING);
        }
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