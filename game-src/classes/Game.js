import * as THREE from 'three';
import Assets from './Assets';
import Chicken from './Chicken';
import AssetType from '../enums/AssetType';
import World from './World';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Lanes from './Lanes';
import * as dat from 'dat.gui';
import ChickenCamera from './ChickenCamera';

// const gui = new dat.GUI();

/** The main class for game. */
class Game {
    /**
     * Creates new game.
     * @param {string} canvasId ID attribute of canvas element.
     * @param {string} canvasContainerId ID attribute of container for canvas element.
     * @param {GameController} gameController Game controller to be used to control game.
     */
    constructor(canvasId, canvasContainerId, gameController) {
        this._renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById(canvasId)
        });
        this._canvasContainer = document.getElementById(canvasContainerId);

        this._world = new World();
        this._assets = new Assets([
            {
                name: "Chicken Model",
                src: "./assets/Chicken.glb",
                type: AssetType.GLTF
            }
        ]);
        this._gameController = gameController;
        this._lanes = null;

        // this._camera = new THREE.PerspectiveCamera(40, this._canvasContainer.clientWidth / this._canvasContainer.clientHeight, 0.1, 500); // TODO - potom to změnit
        // this._camera.position.x = 4;
        // this._camera.position.y = 8;
        // this._camera.position.z = 9;
        // this._camera.lookAt(0, 0.7, 0);

        // gui.add(this._camera.position, "x").min(-20).max(20).step(0.01).onChange(() => this._camera.lookAt(0, 0.7, 0));
        // gui.add(this._camera.position, "y").min(-20).max(20).step(0.01).onChange(() => this._camera.lookAt(0, 0.7, 0));
        // gui.add(this._camera.position, "z").min(-20).max(20).step(0.01).onChange(() => this._camera.lookAt(0, 0.7, 0));

        this._chicken = null;
        this._chickenCamera = null;

        window.addEventListener("resize", () => this._onResize());
        this._onResize();
        this._assets.onLoad.subscribe(() => this._onAssetsLoaded());
        this._assets.onProgress.subscribe((_, percentage) => this._onLoadingProgress(percentage));

        // new OrbitControls(this._camera, this._canvasContainer);
    }

    /**
     * Updates game. This method has to be called multiple times per frame.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this._assets.loaded) return;
        // return;
        this._lanes.move(dt * 0.001);
        this._chicken.updatePosition(dt * 0.001);
        this._chicken.update(dt);
        this._chickenCamera.update();
    }

    /**
     * Draws game on canvas. This method has to be called multiple times per frame.
     */
    draw() {
        if (!this._assets.loaded) return;
        this._renderer.render(this._world.scene, this._chickenCamera.camera);
    }

    // called when window is resized
    _onResize() {
        // update camera
        if (this._chickenCamera) this._chickenCamera.resize(this._canvasContainer.clientWidth / this._canvasContainer.clientHeight);

        // update renderer
        this._renderer.setSize(this._canvasContainer.clientWidth, this._canvasContainer.clientHeight);
    }

    // called when assets loading progress occurs
    _onLoadingProgress(percentage) {
        console.log(percentage);
    }

    // called after assets are loaded
    _onAssetsLoaded() {
        this._chicken = new Chicken(this._assets, this._gameController);
        this._chickenCamera = new ChickenCamera(this._chicken, this._canvasContainer.clientWidth / this._canvasContainer.clientHeight);
        this._lanes = new Lanes();

        // new OrbitControls(this._chickenCamera.camera, this._canvasContainer);

        this._world.addMesh(this._chicken.mesh);
        this._world.addMesh(this._lanes.mesh);
    }
}

export default Game;