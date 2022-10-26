import GameController from "./GameController";

/**
 * Game controller that can be used to control game using keyboard.
 * @extends GameController
 */
class KeyboardController extends GameController {
    constructor() {
        super();

        this._lastPressedKeyCode = null;

        document.addEventListener("keydown", (e) => this._onKeyDown(e));
        document.addEventListener("keyup", (e) => this._onKeyUp(e));
    }

    // called when key is pressed
    _onKeyDown(e) {
        // block holding of key
        // (keydown event is also called when key is pressed for a long time)
        if (e.code === this._lastPressedKeyCode) return;

        this._emitControlEvent(e.code);

        // store key that was last pressed to block holding of key
        this._lastPressedKeyCode = e.code;
    }

    // emits event to control game based on pressed key
    _emitControlEvent(keyCode) {
        switch(keyCode) {
            case "KeyW":
            case "ArrowUp":
            case "Space":
                this.onMoveForward.fire(this);
                break;
            case "KeyS":
            case "ArrowDown":
                this.onMoveBack.fire(this);
                break;
            case "KeyA":
            case "ArrowLeft":
                this.onMoveLeft.fire(this);
                break;
            case "KeyD":
            case "ArrowRight":
                this.onMoveRight.fire(this);
                break;
        }
    }

    // called when key is no longer being pressed
    _onKeyUp(e) {
        if (e.code === this._lastPressedKeyCode) {
            this._lastPressedKeyCode = null;
        }
    }
}

export default KeyboardController;