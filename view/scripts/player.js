import { InputHandler } from "./inputHandler.js";
import { Projectile } from "./projectile.js";
import { rotatePoint, calculateAngleBetweenTwoPoints } from "./utils/math.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class Player {
  /** @type {Position} */
  position = { x: 0, y: 0 };
  /** @type {Position} */
  viewDirection = { x: 0, y: 0 };
  viewAngle = 0;
  height = 50;
  width = 35;
  maxHealth = 100;
  currenHealth = 33;

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {InputHandler} inputHandler
   * @param {Projectile[]} projectiles
   */
  constructor(ctx, inputHandler, projectiles) {
    this._ctx = ctx;
    this._inputHandler = inputHandler;
    this._projectiles = projectiles;

    this.#handleFire();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.#renderHealthBar(ctx);
    this.#renderPlayerModel(ctx);
  }

  update() {
    this.#handleMovement();
    this.#handleRotation();
  }

  // TODO: Videti kako da izbadcimo ctx iz ove metode
  #handleMovement() {
    const pressedKeys = this._inputHandler.downKeys;
    if (pressedKeys.includes("a")) {
      this.position.x -= 10;

      if (this.position.x <= 0) {
        this.position.x = 0;
      }
    }
    if (pressedKeys.includes("d")) {
      this.position.x += 10;
      if (this.position.x >= this._ctx.canvas.width - this.width) {
        this.position.x = this._ctx.canvas.width - this.width;
      }
    }
    if (pressedKeys.includes("w")) {
      this.position.y -= 10;
      if (this.position.y <= -this.height / 2) {
        this.position.y = -this.height / 2;
      }
    }
    if (pressedKeys.includes("s")) {
      this.position.y += 10;
      if (this.position.y >= this._ctx.canvas.height - this.height / 2) {
        this.position.y = this._ctx.canvas.height - this.height / 2;
      }
    }
  }

  #handleRotation() {
    this.viewDirection = this._inputHandler.mousePosition;

    this.viewAngle = calculateAngleBetweenTwoPoints(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
      this.viewDirection.x,
      this.viewDirection.y,
    );
  }

  #handleFire() {
    window.addEventListener("mousedown", (event) => {
      const centerX = this.position.x + this.width / 2;
      const centerY = this.position.y + this.height / 2;
      this._projectiles.push(
        new Projectile(
          this,
          { x: centerX, y: centerY },
          { x: this.viewDirection.x, y: this.viewDirection.y },
        ),
      );
    });
  }

  #renderHealthBar(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x,
      this.position.y - this.height / 2,
      this.width - this.width * (this.currenHealth / this.maxHealth),
      10,
    );

    ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x + this.width * (1 - this.currenHealth / this.maxHealth),
      this.position.y - this.height / 2,
      this.width * (this.currenHealth / this.maxHealth),
      10,
    );
  }

  #renderPlayerModel(ctx) {
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    const topLeft = rotatePoint(
      this.position.x,
      this.position.y,
      centerX,
      centerY,
      this.viewAngle,
    );
    const topRight = rotatePoint(
      this.position.x + this.width,
      this.position.y,
      centerX,
      centerY,
      this.viewAngle,
    );
    const bottomLeft = rotatePoint(
      this.position.x,
      this.position.y + this.height,
      centerX,
      centerY,
      this.viewAngle,
    );
    const bottomRight = rotatePoint(
      this.position.x + this.width,
      this.position.y + this.height,
      centerX,
      centerY,
      this.viewAngle,
    );

    ctx.beginPath();
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.lineTo(bottomLeft.x, bottomLeft.y);
    ctx.closePath();

    ctx.fillStyle = "blue";
    ctx.fill();
  }
}
