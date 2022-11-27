import Button from "./Button";
import PopupWindow from "./PopupWindow";
import EventSource from "./utils/EventSource";

class StartWindow extends PopupWindow {
    constructor(heading) {
        super(heading);
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

    _createContentElements() {
        const paragraph = document.createElement("p");
        paragraph.classList.add("paragraph", "u-mb-4");
        paragraph.innerText = "Pro start hry stiskni mezerník nebo klikni na následující tlačítko.";
        this.domElement.appendChild(paragraph);

        this._button = new Button("Začít", "play");
        this.domElement.appendChild(this._button.domElement);
    }

    _onStart() {
        this._started = true;
        this.onStart.fire(this);
    }
}

export default StartWindow;