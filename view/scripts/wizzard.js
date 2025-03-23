import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";
import { rotatePoint } from "./utils/math.js";
import { World } from "./world.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class Wizzard {
  /** @type {Position} */
  position = { x: 0, y: 0 };
  pointerAngle = 0;
  height = 40;
  width = 40;
  maxHealth = 100;
  currenHealth = 100;
  speed = 2.2;

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Projectile[]} projectiles
   * @param {World} world
   * @param {HTMLImageElement} image
   * @param {Position} startingPosition
   */
  constructor(ctx, projectiles, world, image, startingPosition) {
    this._ctx = ctx;
    this._projectiles = projectiles;
    this._world = world;
    this.image = image;

    this.position = startingPosition;

    this.currenHealth = this.maxHealth;
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    this.#renderHealthBar(screen);
    this.#renderPlayerModel(screen);
  }

  update() {}

  takeDamage(damage) {
    this.currenHealth -= damage;
  }

  isDead() {
    return this.currenHealth <= 0;
  }

  /** @param {Screen} screen */
  #renderHealthBar(screen) {
    const yOffset = this.height / 2;
    const currentHealthPercent = this.currenHealth / this.maxHealth;

    screen.context.fillStyle = "red";
    screen.context.fillRect(
      this.position.x,
      this.position.y - yOffset,
      this.width * (1 - currentHealthPercent),
      10,
    );

    screen.context.fillStyle = "green";
    screen.context.fillRect(
      this.position.x + this.width * (1 - currentHealthPercent),
      this.position.y - yOffset,
      this.width * currentHealthPercent,
      10,
    );
  }

  /** @param {Screen} screen */
  #renderDead(screen) {
    screen.context.save();
    screen.context.drawImage(
      document.getElementById("dead_player_blood_splat"),
      0,
      0,
      440,
      550,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
    screen.context.restore();
  }

  /** @param {Screen} screen */
  #renderDebug(screen) {
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    const topLeft = rotatePoint(
      centerX - this.width / 2,
      centerY - this.height / 2,
      centerX,
      centerY,
      this.pointerAngle,
    );
    const topRight = rotatePoint(
      centerX + this.width / 2,
      centerY - this.height / 2,
      centerX,
      centerY,
      this.pointerAngle,
    );
    const bottomLeft = rotatePoint(
      centerX - this.width / 2,
      centerY + this.height / 2,
      centerX,
      centerY,
      this.pointerAngle,
    );
    const bottomRight = rotatePoint(
      centerX + this.width / 2,
      centerY + this.height / 2,
      centerX,
      centerY,
      this.pointerAngle,
    );

    screen.context.save();
    screen.context.beginPath();
    screen.context.moveTo(topLeft.x, topLeft.y);
    screen.context.lineTo(topRight.x, topRight.y);
    screen.context.lineTo(bottomRight.x, bottomRight.y);
    screen.context.lineTo(bottomLeft.x, bottomLeft.y);
    screen.context.closePath();

    screen.context.fillStyle = "blue";
    screen.context.fill();
    screen.context.restore();
  }

  /** @param {Screen} screen */
  #renderPlayerModel(screen) {
    if (this.isDead()) {
      this.#renderDead(screen);
      return;
    }

    screen.context.save();
    screen.context.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
    );
    // TODO: imamo ovaj + (90%) jer je slika lose rotirana
    screen.context.rotate(this.pointerAngle + 1.570796);
    screen.context.drawImage(
      this.image,
      0,
      0,
      17,
      18,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    screen.context.restore();
  }
}
