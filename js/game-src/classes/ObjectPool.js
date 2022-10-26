/** Object pool. Can be used to reuse objects that are in game just for some time and then deleted. */
class ObjectPool {
    /**
     * Creates new object pool.
     * @param {*} resourceContructor Constructor to be used to create resource.
     * @param {[]} constructorParams Parameters for contructor.
     */
    constructor(resourceContructor, constructorParams=[]) {
        this._resourceConstructor = resourceContructor;
        this._constructorParams = constructorParams;
        // here are stored resources that are no longer used and are ready to be reused
        this._resources = [];
    }

    /**
     * Returns resource that can be used or creates new one (but you don't have to worry about that).
     * @returns Resource to use.
     */
    get() {
        let resource;
        if (this._resources.length === 0) {
            // create new resource if there are no resources to be reused
            resource = new this._resourceConstructor(...this._constructorParams);
        } else {
            // get resource to be reused
            resource = this._resources.pop();
        }

        // initialize resource
        if (resource.init) resource.init();
        // return initialized resource
        return resource;
    }

    /**
     * Returns resource back to object pool.
     * @param {*} resource Resource to return back to object pool.
     */
    return(resource) {
        // reset resource
        if (resource.reset) resource?.reset();
        // store resource to be reused
        this._resources.push(resource);
    }
}

export default ObjectPool;