import MainLoop from "mainloop.js";
import Game from "./Game";

const game = new Game("WebGLCanvas", "CanvasContainer");

MainLoop.setUpdate(dt => {
    game.update(dt);
});

MainLoop.setDraw(() => {
    game.draw();
});

MainLoop.start();