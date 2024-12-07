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
  constructor(player, origin, direction) {
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
    this.speed = 5;
  }

  get shouldBeDeleted() {
    return this.shouldDeleted;
  }

  /**
   * @param {Screen} screen
   */
  update(screen) {
    this.position = rotatePoint(
      this.position.x + this.speed,
      this.position.y,
      this.position.x,
      this.position.y,
      this.angle,
    );

    if (this.position.x < 0 || this.position.x > screen.width) {
      this.shouldDeleted = true;
    }
    if (this.position.y < 0 || this.position.y > screen.height) {
      this.shouldDeleted = true;
    }
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    screen.context.beginPath();
    screen.context.ellipse(
      this.position.x,
      this.position.y,
      10,
      5,
      this.angle,
      0,
      Math.PI * 2,
    );
    // screen.context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    screen.context.fillStyle = "black";
    screen.context.fill();
    screen.context.closePath();
  }
}
