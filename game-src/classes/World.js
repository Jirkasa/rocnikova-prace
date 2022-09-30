import * as THREE from 'three';

/** Represents world for game. (It contains Three.js scene.) */
class World {
    constructor() {
        /**
         * Three.js scene.
         * @type {Scene}
         */
        this.scene = new THREE.Scene();

        this._setupScene();
    }

    /**
     * Adds object to world.
     * @param {Object3D} object Object to be added to world.
     */
    addMesh(object) {
        this.scene.add(object);
    }

    // setups scene (adds light...)
    _setupScene() {
        // ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // direction light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0.5, 1.5, 0.3);
        this.scene.add(directionalLight);
    }
}

export default World;