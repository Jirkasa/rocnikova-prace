import * as THREE from 'three';
import Assets from './Assets';
import Chicken from './Chicken';
import AssetType from '../enums/AssetType';
import World from './World';
import Lanes from './Lanes';
import ChickenCamera from './ChickenCamera';
import StartWindow from './StartWindow';
import Score from './Score';
import ResultWindow from './ResultWindow';

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
        this._loadIcon = document.getElementById("GameLoadIcon");

        // windows
        this._startWindow = new StartWindow("Start");
        this._startWindow.onStart.subscribe(() => this._onStart());
        this._resultWindow = new ResultWindow("Výsledky", "ScoreValue");
        this._resultWindow.onRestart.subscribe(() => this._onRestart());

        // current speed of game
        // (the further the player goes, the faster game is)
        this._speed = 1;

        this._gameStarted = false;

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
        this._score = null;

        this._chicken = null;
        this._chickenCamera = null;

        window.addEventListener("resize", () => this._onResize());
        this._onResize();
        this._assets.onLoad.subscribe(() => this._onAssetsLoaded());
    }

    // called when player starts game
    _onStart() {
        this._createSounds();
        this._chicken.canMove = true;
        this._score.visible = true;
        this._score.reset();

        // remove start window
        this._canvasContainer.removeChild(this._startWindow.domElement);

        this._gameStarted = true;
    }

    // called when player restarts game
    _onRestart() {
        this._lanes.reset();
        this._chicken.reset();

        this._score.reset();
        this._score.visible = true;

        this._canvasContainer.removeChild(this._resultWindow.domElement);

        this._speed = 1;

        this._gameStarted = true;
    }

    // called when game is over (chicken dies)
    // - as parameter is passed whether player was too slow and because of that died
    _onGameOver(tooSlow) {
        this._score.visible = false;

        this._resultWindow.setScore(this._score.value);

        // if player was too slow, result window is displayed
        // right away, otherwise, there is a small delay
        setTimeout(() => {
            this._canvasContainer.appendChild(this._resultWindow.domElement);
        }, tooSlow ? 0 : 1000);

        this._gameStarted = false;
    }

    // called when player reached new highest plane
    _onNewHighestTile(tileNumber) {
        this._speed = 1 + Math.max(Math.log(tileNumber * 0.25), 0);
    }

    // creates sounds for game
    _createSounds() {
        // create and play sound for cars
        const sound = new THREE.Audio(this._chickenCamera.audioListener);
        sound.setBuffer(this._assets.getAsset("Cars Sound"));
        sound.setLoop(true);
        sound.play();

        // create and set dead sound for chicken
        const deadSound = new THREE.Audio(this._chickenCamera.audioListener);
        deadSound.setBuffer(this._assets.getAsset("Deads Sound"));
        this._chicken.deadSound = deadSound;

        // create and set sounds for chicken
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
    }

    /**
     * Updates game. This method has to be called at least once per frame.
     * @param {number} dt Delta time.
     */
    update(dt) {
        if (!this._assets.loaded) return;

        // move lanes and chicken (create illusion of moving camera)
        if (this._gameStarted) {
            this._lanes.move(dt * 0.001 * this._speed);
            this._chicken.updatePosition(dt * 0.001 * this._speed);
        }

        this._lanes.update(dt);

        this._chicken.update(dt);
        this._chickenCamera.update(dt);
    }

    /**
     * Draws game on canvas. This method has to be called once per frame.
     */
    draw() {
        if (!this._assets.loaded) return;
        this._lanes.updateInstancedMeshes();
        this._renderer.render(this._world.scene, this._chickenCamera.camera);
    }

    // called when window is resized
    _onResize() {
        // update camera
        if (this._chickenCamera) this._chickenCamera.resize(this._canvasContainer.clientWidth / this._canvasContainer.clientHeight);

        // update renderer
        this._renderer.setSize(this._canvasContainer.clientWidth, this._canvasContainer.clientHeight);
    }

    // called after assets are loaded
    _onAssetsLoaded() {
        this._lanes = new Lanes(this._assets);
        this._chicken = new Chicken(this._assets, this._lanes, this._gameController);
        this._chickenCamera = new ChickenCamera(this._chicken, this._lanes, this._canvasContainer.clientWidth / this._canvasContainer.clientHeight);
        this._score = new Score("Score", "ScoreValue", this._lanes);

        this._chicken.onDead.subscribe((_, tooSlow) => this._onGameOver(tooSlow));
        this._lanes.onNewHighestYTile.subscribe((_, tileNumber) => this._onNewHighestTile(tileNumber));

        this._world.addMesh(this._chicken.mesh);
        this._world.addMesh(this._lanes.mesh);

        this._loadIcon.style.display = "none";

        this._canvasContainer.appendChild(this._startWindow.domElement);
    }
}

export default Game;