import * as THREE from 'three';
import Assets from './Assets';
import AssetType from './enums/AssetType';
import World from './World';

class Game {
    constructor(canvasId, canvasContainerId) {
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

        this._camera = new THREE.PerspectiveCamera(45, this._canvasContainer.clientWidth / this._canvasContainer.clientHeight, 0.1, 500); // TODO - potom to změnit

        window.addEventListener("resize", () => this._onResize());
    }

    update(dt) {
    }

    draw() {
        this._renderer.render(this._world.scene, this._camera);
    }

    _onResize() {
        this._camera.aspect = this._canvasContainer.clientWidth / this._canvasContainer.clientHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(this._canvasContainer.clientWidth, this._canvasContainer.clientHeight);
    }
}

export default Game;