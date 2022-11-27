import EventSource from "./utils/EventSource";

/** Base class for game controller. Can be extended and used to control game. */
class GameController {
    constructor() {
        /**
         * Event source for move left signal.
         * @type {EventSource}
         */
        this.onMoveLeft = new EventSource();
        /**
         * Event source for move right signal.
         * @type {EventSource}
         */
        this.onMoveRight = new EventSource();
        /**
         * Event source for move forward signal.
         * @type {EventSource}
         */
        this.onMoveForward = new EventSource();
        /**
         * Event source for move back signal.
         * @type {EventSource}
         */
        this.onMoveBack = new EventSource();
    }
}

export default GameController;