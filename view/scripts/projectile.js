import { Player } from "./player.js";
import { Screen } from "./screen.js";
import { calculateAngleBetweenTwoPoints, rotatePoint } from "./utils/math.js";
import { World } from "./world.js";

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
   * @param {World} world
   */
  constructor(player, origin, direction, world) {
    console.log({
      x: origin.x,
      y: origin.y,
    });
    this.owner = player;
    this.position = origin;
    this.direction = direction;
    this.world = world;
    this.angle = calculateAngleBetweenTwoPoints(
      origin.x,
      origin.y,
      direction.x,
      direction.y,
    );
    this.shouldDeleted = false;
    this.speed = 3;
    this.damage = 20;

    this.width = 15;
    this.height = 35;
  }

  shouldBeDeleted() {
    return this.shouldDeleted;
  }

  setDeletion(val) {
    this.shouldBeDeleted = val;
  }

  update() {
    this.position = rotatePoint(
      this.position.x + this.speed,
      this.position.y,
      this.position.x,
      this.position.y,
      this.angle,
    );

    if (this.position.x < 0 || this.position.x > this.world.width) {
      this.shouldDeleted = true;
    }
    if (this.position.y < 0 || this.position.y > this.world.height) {
      this.shouldDeleted = true;
    }
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    screen.context.save();
    screen.context.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
    );
    // TODO: imamo ovaj + (90%) jer je slika lose rotirana
    screen.context.rotate(this.angle + 1.570796);
    screen.context.drawImage(
      document.getElementById("projectile"),
      0,
      0,
      20,
      55,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );

    screen.context.restore();
  }

  /**
   * @param {Screen} screen
   */
  #renderDebug(screen) {
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
