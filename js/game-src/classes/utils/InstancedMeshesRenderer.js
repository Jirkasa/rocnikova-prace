import * as THREE from 'three';
import Config from '../../Config';
import InstancedMeshes from "./InstancedMeshes";

/**
 * Manages updating of objects rendered as instanced meshes.
 */
class InstancedMeshesRenderer {
    /**
     * 
     * @param {Assets} assets Loaded assets.
     * @param {Object3D|Scene} meshesContainer Object (or scene) into which should be added created instanced meshes.
     */
    constructor(assets, meshesContainer) {
        // geometries
        const groundGeometry = new THREE.PlaneGeometry(Config.NUMBER_OF_TILES * Config.TILE_SIZE, Config.TILE_SIZE);
        const groundSideGeometry = new THREE.PlaneGeometry(Config.SIDE_GROUND_SIZE, Config.TILE_SIZE);
        const treeTrunkGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const treeLeavesGeometry = new THREE.BoxGeometry(0.9, 1.6, 0.9);
        const carGeometry = assets.getAsset("Car Model").scene.children[0].geometry;
        // materials
        const grassMaterial = new THREE.MeshPhongMaterial({
            color: 0x53c466
        });
        const grassSideMaterial = new THREE.MeshPhongMaterial({
            color: 0x358342
        });
        const roadMaterial = new THREE.MeshPhongMaterial({
            color: 0x40403e
        });
        const roadSideMaterial = new THREE.MeshPhongMaterial({
            color: 0x262625
        });
        const treeTrunkMaterial = new THREE.MeshPhongMaterial({
            color: 0x5e4617
        });
        const treeLeavesMaterial = new THREE.MeshPhongMaterial({
            color: 0x229a36
        });
        const carMaterial = new THREE.MeshPhongMaterial({
            vertexColors: true
        });

        // instanced meshes
        this._grassInstancedMeshes = new InstancedMeshes(groundGeometry, grassMaterial, Config.NUMBER_OF_VISIBLE_LANES, meshesContainer);
        this._grassSideInstancedMeshes = new InstancedMeshes(groundSideGeometry, grassSideMaterial, Config.NUMBER_OF_VISIBLE_LANES*2, meshesContainer);
        this._roadInstancedMeshes = new InstancedMeshes(groundGeometry, roadMaterial, Config.NUMBER_OF_VISIBLE_LANES, meshesContainer);
        this._roadSideInstancedMeshes = new InstancedMeshes(groundSideGeometry, roadSideMaterial, Config.NUMBER_OF_VISIBLE_LANES*2, meshesContainer);
        this._treeTrunkInstancedMeshes = new InstancedMeshes(treeTrunkGeometry, treeTrunkMaterial, 100, meshesContainer);
        this._treeLeavesInstancedMeshes = new InstancedMeshes(treeLeavesGeometry, treeLeavesMaterial, 100, meshesContainer);
        this._carInstancedMeshes = new InstancedMeshes(carGeometry, carMaterial, 100, meshesContainer);
    }

    /**
     * Begins to update instanced meshes.
     */
    begin() {
        this._grassInstancedMeshes.begin();
        this._grassSideInstancedMeshes.begin();
        this._roadInstancedMeshes.begin();
        this._roadSideInstancedMeshes.begin();
        this._treeTrunkInstancedMeshes.begin();
        this._treeLeavesInstancedMeshes.begin();
        this._carInstancedMeshes.begin();
    }

    /**
     * Sets grass lane.
     * @param {Matrix4} matrix Matrix4 representing local transformation of grass lane.
     * @param {Matrix4} leftSideMatrix Matrix4 representing local transformation of left side of grass lane.
     * @param {Matrix4} rightSideMatrix Matrix4 representing local transformation of right side of grass lane.
     */
    setGrass(matrix, leftSideMatrix, rightSideMatrix) {
        this._grassInstancedMeshes.set(matrix);
        this._grassSideInstancedMeshes.set(leftSideMatrix);
        this._grassSideInstancedMeshes.set(rightSideMatrix);
    }

    /**
     * Sets road lane.
     * @param {Matrix4} matrix Matrix4 representing local transformation of road lane.
     * @param {Matrix4} leftSideMatrix Matrix4 representing local transformation of left side of road lane.
     * @param {Matrix4} rightSideMatrix Matrix4 representing local transformation of right side of road lane.
     */
    setRoad(matrix, leftSideMatrix, rightSideMatrix) {
        this._roadInstancedMeshes.set(matrix);
        this._roadSideInstancedMeshes.set(leftSideMatrix);
        this._roadSideInstancedMeshes.set(rightSideMatrix);
    }

    /**
     * Sets tree.
     * @param {Matrix4} trunkMatrix Matrix4 representing local transformation of tree trunk.
     * @param {Matrix4} leavesMatrix Matrix4 representing local transformation of tree leaves.
     */
    setTree(trunkMatrix, leavesMatrix) {
        this._treeTrunkInstancedMeshes.set(trunkMatrix);
        this._treeLeavesInstancedMeshes.set(leavesMatrix);
    }

    /**
     * Sets car.
     * @param {Matrix4} matrix Matrix4 representing local transformation of car.
     */
    setCar(matrix) {
        this._carInstancedMeshes.set(matrix);
    }

    // Finishes updating of instanced meshes.
    finish() {
        this._grassInstancedMeshes.finish();
        this._grassSideInstancedMeshes.finish();
        this._roadInstancedMeshes.finish();
        this._roadSideInstancedMeshes.finish();
        this._treeTrunkInstancedMeshes.finish();
        this._treeLeavesInstancedMeshes.finish();
        this._carInstancedMeshes.finish();
    }
}

export default InstancedMeshesRenderer;