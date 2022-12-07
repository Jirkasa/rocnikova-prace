/**
 * Represents base class for windows.
 */
class PopupWindow {
    /**
     * Creates new popup window.
     * @param {string} heading Heading of popup window.
     */
    constructor(heading) {
        /**
         * DOM element of popup window.
         * @type {Element}
         */
        this.domElement = null;

        this._createElements(heading);
    }

    // creates elements of popup window
    _createElements(headingText) {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("game-popup-window");

        const heading = document.createElement("h2");
        heading.classList.add("heading-secondary", "u-mb-4");
        heading.innerText = headingText;
        this.domElement.appendChild(heading);

        const horizontalRule = document.createElement("hr");
        this.domElement.appendChild(horizontalRule);
    }
}

export default PopupWindow;