import { Screen } from "./screen.js";
import { Wizzard } from "./wizzard.js";

/**
 * @typedef {Object} Vector2d
 * @property {number} x
 * @property {number} y
 */

export class Enemy extends Wizzard {
  constructor(world) {
    super(document.getElementById("enemy"), {
      x: Math.random() * world.width,
      y: Math.random() * world.height,
    });
  }

  /** @param {Screen} screen */
  render(screen) {
    this.renderPlayerModel(screen, {
      x: this.position.x - screen.position.x + screen.width / 2,
      y: this.position.y - screen.position.y + screen.height / 2,
    });
    this.renderHealthBar(screen, {
      x: this.position.x - screen.position.x + screen.width / 2,
      y: this.position.y - screen.position.y + screen.height / 2,
    });
  }
}
