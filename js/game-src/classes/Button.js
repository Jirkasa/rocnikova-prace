import EventSource from "./utils/EventSource";

class Button {
    constructor(text, iconName=null) {
        this.domElement = null;
        this.onClick = new EventSource();

        this._createElements(text, iconName);

        this.domElement.addEventListener("click", () => this.onClick.fire(this));
    }

    _createElements(buttonText, buttonIconName=null) {
        this.domElement = document.createElement("button");
        this.domElement.classList.add("button-primary");

        if (buttonIconName !== null) {
            this.domElement.innerHTML = `
            <svg>
                <use xlink:href="./static/icon-sprite.svg#${buttonIconName}"></use>
            </svg>
            <span>${buttonText}</span>
            `;
        } else {
            this.domElement.innerText = buttonText;
        }
    }
}

export default Button;