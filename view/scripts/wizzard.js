import { Screen } from "./screen.js";
import { rotatePoint } from "./utils/math.js";

/**
 * @typedef {Object} Vector2d
 * @property {number} x
 * @property {number} y
 */

export class Wizzard {
  /** @type {Vector2d} */
  position = { x: 0, y: 0 };
  pointerAngle = 0;
  height = 40;
  width = 40;
  maxHealth = 100;
  currenHealth = 100;
  speed = 2.2;

  /**
   * @param {HTMLImageElement} image
   * @param {Vector2d} startingPosition
   */
  constructor(image, startingPosition) {
    this.image = image;

    this.position = startingPosition;

    this.currenHealth = this.maxHealth;
  }

  /** @param {Screen} screen */
  render(screen) {
    this.renderHealthBar(screen, this.position);
    this.renderPlayerModel(screen, this.position);
  }

  update() {}

  takeDamage(damage) {
    this.currenHealth -= damage;
  }

  isDead() {
    return this.currenHealth <= 0;
  }

  /**
   * @param {Screen} screen
   * @param {Vector2d} position
   */
  renderHealthBar(screen, position) {
    if (this.isDead()) {
      return;
    }
    const yOffset = this.height / 2;
    const currentHealthPercent = this.currenHealth / this.maxHealth;

    screen.context.fillStyle = "red";
    screen.context.fillRect(
      position.x,
      position.y - yOffset,
      this.width * (1 - currentHealthPercent),
      10,
    );

    screen.context.fillStyle = "green";
    screen.context.fillRect(
      position.x + this.width * (1 - currentHealthPercent),
      position.y - yOffset,
      this.width * currentHealthPercent,
      10,
    );
  }

  /**
   * @param {Screen} screen
   * @param {Vector2d} position
   */
  renderDead(screen, position) {
    screen.context.save();
    screen.context.drawImage(
      document.getElementById("dead_player_blood_splat"),
      0,
      0,
      440,
      550,
      position.x,
      position.y,
      this.width,
      this.height,
    );
    screen.context.restore();
  }

  /** @param {Screen} screen */
  renderDebug(screen) {
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

  /** @param {Screen} screen
   *@param {Vector2d} position
   * */
  renderPlayerModel(screen, position) {
    if (this.isDead()) {
      this.renderDead(screen, position);
      return;
    }

    screen.context.save();
    screen.context.translate(
      position.x + this.width / 2,
      position.y + this.height / 2,
    );
    // TODO: ovo ne radi bas najbolje za Hero
    screen.context.rotate(this.pointerAngle);
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
