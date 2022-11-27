import { DynamicDrawUsage, InstancedMesh } from "three";

/**
 * Allows for rendering meshes using InstancedMesh class with dynamic number of instances. When one InstancedMesh is not enough, another one is created.
 */
class InstancedMeshes {
    /**
     * Creates new instanced meshes.
     * @param {BufferGeometry} geometry Geometry to use for InstacedMeshes.
     * @param {Material} material Material to use for InstancedMeshes.
     * @param {number} maxCountPerInstancedMesh Maximum number of instances per instanced mesh (How many instances can InstancedMesh store).
     * @param {Scene} scene Scene into which should be added created InstancedMeshes.
     */
    constructor(geometry, material, maxCountPerInstancedMesh, scene) {
        this._geometry = geometry;
        this._material = material;
        this._maxCountPerMesh = maxCountPerInstancedMesh;
        this._scene = scene;

        // stores instanced meshes
        this._meshes = [this._createInstancedMesh()];

        // stores number for next instance that can be set
        this._currentInstanceNumber = 0;
    }

    /**
     * Begins to set instances.
     */
    begin() {
        this._currentInstanceNumber = 0;
    }

    /**
     * Sets matrix for instance.
     * @param {Matrix4} matrix Matrix4 representing local transformation of instance.
     */
    set(matrix) {
        // get/create instanced mesh
        let instancedMesh = this._meshes[
            Math.trunc(this._currentInstanceNumber / this._maxCountPerMesh)
        ];
        if (!instancedMesh) {
            instancedMesh = this._createInstancedMesh();
            this._meshes.push(instancedMesh);
        }

        // get index of instance where to set matrix
        let index = this._currentInstanceNumber % this._maxCountPerMesh;

        instancedMesh.setMatrixAt(index, matrix);

        this._currentInstanceNumber++;
    }

    /**
     * Finishes setting of instances.
     */
    finish() {
        if (this._currentInstanceNumber > 0) {
            // if there is something to render, get index of last instanced mesh that should have instances..
            let lastInstancedMeshIdx = Math.trunc((this._currentInstanceNumber-1) / this._maxCountPerMesh);
    
            // for all meshes that should have all instances, count is set to max value
            for (let i = 0; i < lastInstancedMeshIdx; i++) {
                this._meshes[i].count = this._maxCountPerMesh;
                this._meshes[i].instanceMatrix.needsUpdate = true;
            }
    
            // set count for last instanced mesh, that should have instances
            this._meshes[lastInstancedMeshIdx].count = ((this._currentInstanceNumber-1) % this._maxCountPerMesh)+1;
            this._meshes[lastInstancedMeshIdx].instanceMatrix.needsUpdate = true;
    
            // set count to 0 for all instances, that should have no instances
            for (let i = lastInstancedMeshIdx + 1; i < this._meshes.length; i++) {
                this._meshes[i].count = 0;
            }
        } else {
            // if there is nothing to render
            for (let mesh of this._meshes) {
                mesh.count = 0;
            }
        }
    }

    // creates new instanced mesh
    _createInstancedMesh() {
        let instancedMesh = new InstancedMesh(this._geometry, this._material, this._maxCountPerMesh);
        instancedMesh.instanceMatrix.setUsage(DynamicDrawUsage);
        this._scene.add(instancedMesh);

        return instancedMesh;
    }
}

export default InstancedMeshes;