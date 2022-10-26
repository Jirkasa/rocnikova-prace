const path = require("path");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = {
    entry: {
        style: "./less/main.less",
        game: {
            import: "./js/game-src/main.js",
            filename: "js/game.js"
        },
        icons: './icons/main.js',
        home: {
            import: "./js/home/main.js",
            filename: "js/home.js"
        }
    },
    output: {
        path: path.resolve(__dirname, "app", "public", "static"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                issuer: /\.js$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: "icon-sprite.svg"
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: '*:fill:(none|black)'
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new SpriteLoaderPlugin()
    ]
}