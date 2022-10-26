/** Node for doubly linked list. */
class DLLNode {
    /**
     * Creates new node for doubly linked list.
     * @param {*} value Value of node.
     */
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default DLLNode;