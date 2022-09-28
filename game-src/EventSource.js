/** Registeres handler functions to be called, when event occurs. */
class EventSource {
    /** Creates new event source. */
    constructor() {
        // registered handler functions
        this._handlers = new Map();
        // number of registered handlers
        this._count = 0;
    }

    /**
     * Subscribes to event source.
     * @param {EventSource~handler} handler Event handler function.
     * @returns {number} ID of registered handler.
     */
    subscribe(handler) {
        this._handlers.set(this._count, handler);
        return this._count++;
    }

    /**
     * Event handler function.
     * @callback EventSource~handler
     * @param {object} sender Object that fired an event.
     * @param {*} value Value of event.
     */

    /**
     * Unsubscribes from event source.
     * @param {number} id ID of registered handler.
     */
    unsubscribe(id) {
        this._handlers.delete(id);
    }

    /**
     * Fires an event.
     * @param {object} sender Object that fired an event.
     * @param {*} value Value of event.
     */
    fire(sender, value) {
        // call all registered handler functions
        this._handlers.forEach(handler => {
            handler(sender, value);
        });
    }
}

export default EventSource;