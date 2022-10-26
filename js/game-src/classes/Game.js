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

        this._soundsCreated = false;

        this._world = new World();
        this._assets = new Assets([
            {
                name: "Chicken Model",
                src: "./assets/Chicken.glb",
                type: AssetType.GLTF
            },
            {
                name: "Car Model",
                src: "./assets/Car.glb",
                type: AssetType.GLTF
            },
            {
                name: "Cars Sound",
                src: "./assets/cars.ogg",
                type: AssetType.AUDIO
            },
            {
                name: "Deads Sound",
                src: "./assets/chickenDead.ogg",
                type: AssetType.AUDIO
            },
            {
                name: "Chicken Sound 1",
                src: "./assets/Chicken1.ogg",
                type: AssetType.AUDIO
            },
            {
                name: "Chicken Sound 2",
                src: "./assets/Chicken2.ogg",
                type: AssetType.AUDIO
            },
            {
                name: "Chicken Sound 3",
                src: "./assets/Chicken3.ogg",
                type: AssetType.AUDIO
            },
            {
                name: "Chicken Sound 4",
                src: "./assets/Chicken4.ogg",
                type: AssetType.AUDIO
            }
        ]);
        this._gameController = gameController;
        this._lanes = null;

        this._chicken = null;
        this._chickenCamera = null;

        window.addEventListener("resize", () => this._onResize());
        this._onResize();
        this._assets.onLoad.subscribe(() => this._onAssetsLoaded());
        this._assets.onProgress.subscribe((_, percentage) => this._onLoadingProgress(percentage));

        // todo - pro zatím (potom to bude po kliknutí na tlačítko start nebo tak něco)
        // - zvuky se spustí jen až po provedení nějaké akce uživatelem, jinak to nejde
        window.addEventListener("click", () => {
            if (this._soundsCreated) return;
            this._soundsCreated = true;
            
            const sound = new THREE.Audio(this._chickenCamera.audioListener);
            sound.setBuffer(this._assets.getAsset("Cars Sound"));
            sound.setLoop(true);
            sound.play();

            const deadSound = new THREE.Audio(this._chickenCamera.audioListener);
            deadSound.setBuffer(this._assets.getAsset("Deads Sound"));
            this._chicken.deadSound = deadSound;

            const chickenSound1 = new THREE.Audio(this._chickenCamera.audioListener);
            chickenSound1.setVolume(0.3);
            const chickenSound2 = new THREE.Audio(this._chickenCamera.audioListener);
            chickenSound2.setVolume(0.3);
            const chickenSound3 = new THREE.Audio(this._chickenCamera.audioListener);
            chickenSound3.setVolume(0.3);
            const chickenSound4 = new THREE.Audio(this._chickenCamera.audioListener);
            chickenSound4.setVolume(0.3);
            chickenSound1.setBuffer(this._assets.getAsset("Chicken Sound 1"));
            chickenSound2.setBuffer(this._assets.getAsset("Chicken Sound 2"));
            chickenSound3.setBuffer(this._assets.getAsset("Chicken Sound 3"));
            chickenSound4.setBuffer(this._assets.getAsset("Chicken Sound 4"));
            this._chicken.sounds = [chickenSound1, chickenSound2, chickenSound3, chickenSound4];
        });
    }

    /**
     * Updates game. This method has to be called multiple times per frame.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this._assets.loaded) return;

        // move lanes and chicken (create illusion of moving camera)
        this._lanes.move(dt * 0.001);
        this._chicken.updatePosition(dt * 0.001);

        this._lanes.update(dt);

        this._chicken.update(dt);
        this._chickenCamera.update(dt);
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
        this._lanes = new Lanes(this._assets);
        this._chicken = new Chicken(this._assets, this._lanes, this._gameController);
        this._chickenCamera = new ChickenCamera(this._chicken, this._lanes, this._canvasContainer.clientWidth / this._canvasContainer.clientHeight);

        // new OrbitControls(this._chickenCamera.camera, this._canvasContainer);

        this._world.addMesh(this._chicken.mesh);
        this._world.addMesh(this._lanes.mesh);
    }
}

export default Game;