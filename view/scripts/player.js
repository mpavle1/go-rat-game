import { InputHandler } from "./inputHandler.js";

export class Player {
  x = 0;
  y = 0;

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {InputHandler} inputHandler
   */
  constructor(ctx, inputHandler) {
    this._ctx = ctx;
    this._inputHandler = inputHandler;
  }

  render() {
    this._ctx.fillRect(this.x, this.y, 50, 100);
  }

  update() {
    const pressedKeys = this._inputHandler.keyDownArray;
    if (pressedKeys.includes("a")) {
      this.x -= 10;
    }
    if (pressedKeys.includes("d")) {
      this.x += 10;
    }
    if (pressedKeys.includes("w")) {
      this.y -= 10;
    }
    if (pressedKeys.includes("s")) {
      this.y += 10;
    }
  }
}
