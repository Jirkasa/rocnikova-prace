class Score {
    constructor(scoreElementId, scoreValueElementId, lanes) {
        this.value = 0;
        this._element = document.getElementById(scoreElementId);
        this._valueElement = document.getElementById(scoreValueElementId);

        lanes.onNewHighestYTile.subscribe((_, tileNumber) => this._onNewHighestTile(tileNumber));

        this.visible = false;
    }

    get visible() {
        return this._element.style.display === "block";
    }
    set visible(isVisible) {
        this._element.style.display = isVisible ? "block" : "none";
    }

    reset() {
        this.value = 0;

        this._valueElement.innerText = this.value;
    }

    _onNewHighestTile(tileNumber) {
        this.value = tileNumber;

        this._valueElement.innerText = this.value;
    }
}

export default Score;