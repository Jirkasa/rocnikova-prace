import MainLoop from "mainloop.js";
import Game from "./classes/Game";
import KeyboardController from "./classes/KeyboardController";

const gameController = new KeyboardController();
const game = new Game("WebGLCanvas", "CanvasContainer", gameController);

MainLoop.setUpdate(dt => {
    game.update(dt);
});

MainLoop.setDraw(() => {
    game.draw();
});

MainLoop.start();