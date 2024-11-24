import { Player } from "./player.js";
import { Screen } from "./screen.js";
import { calculateAngleBetweenTwoPoints, rotatePoint } from "./utils/math.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */
export class Projectile {
  /**
   * @param {Player} player
   * @param {Position} origin
   * @param {Position} direction
   */
  constructor(ctx, player, origin, direction) {
    this._ctx = ctx;
    this.owner = player;
    this.owner = origin;
    this.position = origin;
    this.direction = direction;
    this.angle = calculateAngleBetweenTwoPoints(
      origin.x,
      origin.y,
      direction.x,
      direction.y,
    );
    this.shouldDeleted = false;
    this.speed = 20;
  }

  get shouldBeDeleted() {
    return this.shouldDeleted;
  }

  update() {
    this.position = rotatePoint(
      this.position.x + this.speed,
      this.position.y,
      this.position.x,
      this.position.y,
      this.angle,
    );

    if (this.position.x < 0 || this.position.x > this._ctx.canvas.width) {
      this.shouldDeleted = true;
    }
    if (this.position.y < 0 || this.position.y > this._ctx.canvas.height) {
      this.shouldDeleted = true;
    }
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    screen.context.beginPath();
    screen.context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    screen.context.fillStyle = "black";
    screen.context.fill();
    screen.context.closePath();
  }
}
