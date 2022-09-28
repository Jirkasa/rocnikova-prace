const path = require("path");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        style: "./less/main.less",
        game: {
            import: "./game-src/main.js",
            filename: "js/game.js"
        }
    },
    output: {
        path: path.resolve(__dirname, "app", "public", "static"),
        clean: true
    },
    plugins: [
        new RemoveEmptyScriptsPlugin()
    ]
}