import Button from "./Button";
import PopupWindow from "./PopupWindow";
import EventSource from "./utils/EventSource";

/**
 * Represents start window.
 * @extends PopupWindow
 */
class StartWindow extends PopupWindow {
    /**
     * Creates new start window.
     * @param {string} heading Heading of window.
     */
    constructor(heading) {
        super(heading);
        /**
         * Event source for event that is emitted when game is started.
         * @type {EventSource}
         */
        this.onStart = new EventSource();

        this._button = null;

        this._createContentElements();

        this._started = false;

        this._button.onClick.subscribe(() => this._onStart());
        document.addEventListener("keydown", (e) => {
            if (this._started) return;
            
            if (e.code === "Space") {
                this._onStart();
            }
        });
    }

    // creates content elements of start window
    _createContentElements() {
        const paragraph = document.createElement("p");
        paragraph.classList.add("paragraph", "u-mb-4");
        paragraph.innerText = "Pro start hry stiskni mezerník nebo klikni na následující tlačítko.";
        this.domElement.appendChild(paragraph);

        this._button = new Button("Začít", "play");
        this.domElement.appendChild(this._button.domElement);
    }

    // called when start button is pressed or space key is pressed
    _onStart() {
        this._started = true;
        this.onStart.fire(this);
    }
}

export default StartWindow;