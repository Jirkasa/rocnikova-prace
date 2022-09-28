import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AssetType from './enums/AssetType';
import EventSource from './EventSource';

class Assets {
    constructor(assets) {
        this.onLoad = new EventSource();
        this.onProgress = new EventSource();
        this.loaded = false;

        this._assets = new Map();
        this._loadingManager = new THREE.LoadingManager();

        // loaders (for now, I need only GLTFLoader)
        this._gltfLoader = new GLTFLoader(this._loadingManager);

        this._loadingManager.onLoad = () => this._onLoaded();
        this._loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => this._onLoadingProgress(itemsLoaded, itemsTotal);
        this._loadAssets(assets);
    }

    getAsset(assetName) {
        return this._assets.get(assetName);
    }

    _loadAssets(assets) {
        for (let asset of assets) {
            switch (asset.type) {
                case AssetType.GLTF:
                    this._gltfLoader.load(asset.src, gltf => {
                        this._assets.set(asset.name, gltf);
                    });
                    break;
            }
        }
    }

    _onLoaded() {
        this.loaded = true;
        this.onLoad.fire(this);
    }

    _onLoadingProgress(itemsLoaded, itemsTotal) {
        const percentage = itemsLoaded / itemsTotal * 100;
        this.onProgress.fire(this, percentage);
    }
}

export default Assets;