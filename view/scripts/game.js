import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { Screen } from "./screen.js";

export class Game {
  constructor() {
    this._screen = new Screen("canvas");
    this._inputHandler = new InputHandler();
    this._player = new Player(this._screen._ctx, this._inputHandler);
  }

  update() {
    this._player.update();
  }
  render() {
    this._screen._ctx.clearRect(0, 0, canvas.width, canvas.height);

    this._player.render();
  }
}
