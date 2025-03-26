import { Screen } from "./screen.js";
import { calculateAngleBetweenTwoPoints, rotatePoint } from "./utils/math.js";
import { Wizzard } from "./wizzard.js";
import { World } from "./world.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */
export class Projectile {
  /**
   * @param {Wizzard} owner
   * @param {Position} origin
   * @param {Position} destination
   * @param {World} world
   */
  constructor(owner, origin, destination, world) {
    this.owner = owner;
    this.position = origin;
    this.direction = destination;
    // TODO: Promeniti tako da ili update metoda prima world ili da se u game radi ova kalkulacija
    this.world = world;
    this.angle = calculateAngleBetweenTwoPoints(
      origin.x,
      origin.y,
      destination.x,
      destination.y,
    );
    this.shouldDeleted = false;
    this.speed = 3;
    this.damage = 20;

    this.height = 15;
    this.width = 35;
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

  /** @param {Screen} screen */
  render(screen) {
    screen.context.save();
    // TODO: Proveriti da li ovo radi kako treba
    screen.context.translate(
      this.position.x - screen.position.x + screen.width / 2 + this.width / 2,
      this.position.y - screen.position.y + screen.height / 2 + this.height / 2,
    );
    screen.context.rotate(this.angle);
    screen.context.drawImage(
      document.getElementById("projectile"),
      0,
      0,
      55,
      20,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );

    screen.context.restore();
  }

  /** @param {Screen} screen */
  #renderDebug(screen) {
    screen.context.beginPath();
    screen.context.ellipse(
      this.position.x - position.x,
      this.position.y - position.y,
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
