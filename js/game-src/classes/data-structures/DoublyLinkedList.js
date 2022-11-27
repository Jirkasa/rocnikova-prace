import DLLNode from "./DLLNode";

/** Doubly linked list data structure. */
class DoublyLinkedList {
    /** Creates new doubly linked list. */
    constructor() {
        /**
         * First node of linked list.
         * @type {DLLNode}
         */
        this.head = null;
        /**
         * Last node of linked list.
         * @type {DLLNode}
         */
        this.tail = null;

        /**
         * Number of nodes in linked list.
         * @type {number}
         * @readonly
         */
        this.length = 0;
    }

    /**
     * Adds new node to end of linked list.
     * @param {*} value Value to store.
     * @returns {DoublyLinkedList}
     */
    push(value) {
        const newNode = new DLLNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;

        return this;
    }

    /**
     * Deletes node from end of linked list and returns its value.
     * @returns {*} Value of removed node.
     */
    pop() {
        if (!this.head) return undefined;

        const removedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removedNode.prev = null;
        }

        this.length--;

        return removedNode.value;
    }

    /**
     * Deletes node from start of linked list and returns its value.
     * @returns {*} Value of removed node.
     */
    shift() {
        if (!this.head) return undefined;

        const oldHead = this.head;
        
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }

        this.length--;

        return oldHead.value;
    }

    /**
     * Adds new node to start of linked list.
     * @param {*} value Value to store.
     * @returns {DoublyLinkedList}
     */
    unshift(value) {
        const newNode = new DLLNode(value);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.length++;

        return this;
    }
}

export default DoublyLinkedList;