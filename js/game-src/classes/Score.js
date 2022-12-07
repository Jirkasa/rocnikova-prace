/**
 * Manages score of game.
 */
class Score {
    /**
     * Creates new score.
     * @param {string} scoreElementId ID attribute of score element.
     * @param {string} scoreValueElementId ID attribute of element in which is displayed score.
     * @param {Lanes} lanes Lanes based on which score will be determined.
     */
    constructor(scoreElementId, scoreValueElementId, lanes) {
        /**
         * Current score value.
         * @type {number}
         */
        this.value = 0;

        this._element = document.getElementById(scoreElementId);
        this._valueElement = document.getElementById(scoreValueElementId);

        // subscribe to changes of highest reached lane
        lanes.onNewHighestYTile.subscribe((_, tileNumber) => this._onNewHighestTile(tileNumber));
        // at start, score is not displayed
        this.visible = false;
    }

    /**
     * Determines whether score is displayed.
     * @type {boolean}
     */
    get visible() {
        return this._element.style.display === "block";
    }
    set visible(isVisible) {
        this._element.style.display = isVisible ? "block" : "none";
    }

    /**
     * Resets score to initial state.
     */
    reset() {
        this.value = 0;

        this._valueElement.innerText = this.value;
    }

    // called when new highest tile is reached
    _onNewHighestTile(tileNumber) {
        this.value = tileNumber;

        this._valueElement.innerText = this.value;
    }
}

export default Score;