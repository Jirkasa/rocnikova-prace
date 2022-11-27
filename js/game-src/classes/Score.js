class Score {
    constructor(scoreValueElementId, lanes) {
        this.value = 0;
        this._element = document.getElementById(scoreValueElementId);

        lanes.onNewHighestYTile.subscribe((_, tileNumber) => this._onNewHighestTile(tileNumber));
    }

    _onNewHighestTile(tileNumber) {
        this.value = tileNumber;

        this._element.innerText = this.value;
    }
}

export default Score;