import * as THREE from 'three';

class World {
    constructor() {
        this.scene = new THREE.Scene();

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        );
        cube.position.z = -3;
        this.scene.add(cube);
    }
}

export default World;