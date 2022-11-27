import Button from "./Button";
import PopupWindow from "./PopupWindow";
import EventSource from "./utils/EventSource";

class ResultWindow extends PopupWindow {
    constructor(heading) {
        super(heading);

        this.onRestart = new EventSource();

        this._highScore = 0;

        this._scoreValueElement = null;
        this._highScoreValueElement = null;
        this._restartButton = null;

        this._createContentElements();

        this._restartButton.onClick.subscribe(() => this.onRestart.fire(this));
    }

    setScore(score) {
        this._scoreValueElement.innerText = score;

        if (score > this._highScore) {
            this._highScore = score;
            this._highScoreValueElement.innerText = this._highScore;
        }
    }

    _createContentElements() {
        const scoreElement = document.createElement("div");
        scoreElement.classList.add("score-text", "u-mb-4");
        scoreElement.innerText = "Skóre: ";
        this._scoreValueElement = document.createElement("span");
        this._scoreValueElement.classList.add("score-text__value");
        scoreElement.appendChild(this._scoreValueElement);
        this.domElement.appendChild(scoreElement);

        const highScoreElement = document.createElement("div");
        highScoreElement.classList.add("score-text", "u-mb-4");
        highScoreElement.innerText = "Nejvyšší skóre: ";
        this._highScoreValueElement = document.createElement("span");
        this._highScoreValueElement.classList.add("score-text__value");
        highScoreElement.appendChild(this._highScoreValueElement);
        this.domElement.appendChild(highScoreElement);

        const horizontalRule = document.createElement("hr");
        horizontalRule.classList.add("u-mb-4");
        this.domElement.appendChild(horizontalRule);

        this._restartButton = new Button("Hrát znovu", "restart");
        this.domElement.appendChild(this._restartButton.domElement);
    }
}

export default ResultWindow;