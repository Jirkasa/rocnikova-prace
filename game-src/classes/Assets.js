import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import AssetType from '../enums/AssetType';
import EventSource from './EventSource';

/** Loads and stores assets. */
class Assets {
    /**
     * Creates new assets.
     * @param {Array} assets Assets to be loaded and stored.
     */
    constructor(assets) {
        /**
         * Event source for event that is fired after all assets are loaded.
         * @type {EventSource}
         */
        this.onLoad = new EventSource();
        /**
         * Event source for loading progress.
         * @type {EventSource}
         */
        this.onProgress = new EventSource();
        /**
         * Indicates whether assets are loaded.
         * @type {number}
         */
        this.loaded = false;

        this._assets = new Map();
        this._loadingManager = new THREE.LoadingManager();
        this._gltfLoader = new GLTFLoader(this._loadingManager);
        this._audioLoader = new THREE.AudioLoader(this._loadingManager);

        // subscribe to loading manager events
        this._loadingManager.onLoad = () => this._onLoaded();
        this._loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => this._onLoadingProgress(itemsLoaded, itemsTotal);

        this._loadAssets(assets);
    }

    /**
     * Returns loaded asset based on passed name.
     * @param {string} assetName Name of asset.
     * @returns Loaded asset.
     */
    getAsset(assetName) {
        return this._assets.get(assetName);
    }

    // loads assets
    _loadAssets(assets) {
        // for every asset description
        for (let asset of assets) {
            // load asset based on its type
            switch (asset.type) {
                case AssetType.GLTF:
                    this._gltfLoader.load(asset.src, gltf => {
                        this._assets.set(asset.name, gltf);
                    });
                    break;
                case AssetType.AUDIO:
                    this._audioLoader.load(asset.src, buffer => {
                        this._assets.set(asset.name, buffer);
                    });
                    break;
            }
        }
    }

    // called by LoadingManager after all assets are loaded
    _onLoaded() {
        this.loaded = true;
        this.onLoad.fire(this);
    }

    // called by LoadingManager on loading progress
    _onLoadingProgress(itemsLoaded, itemsTotal) {
        const percentage = itemsLoaded / itemsTotal * 100;
        this.onProgress.fire(this, percentage);
    }
}

export default Assets;