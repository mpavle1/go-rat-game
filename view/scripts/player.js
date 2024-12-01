import { InputHandler } from "./inputHandler.js";
import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";
import { rotatePoint, calculateAngleBetweenTwoPoints } from "./utils/math.js";
import { World } from "./world.js";

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
  currenHealth = 70;

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {InputHandler} inputHandler
   * @param {Projectile[]} projectiles
   * @param {World} world
   */
  constructor(ctx, inputHandler, projectiles, world) {
    this._ctx = ctx;
    this._inputHandler = inputHandler;
    this._projectiles = projectiles;
    this._world = world;

    this.#handleFire();
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    this.#renderHealthBar(screen);
    this.#renderPlayerModel(screen);
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
    this._ctx.canvas.addEventListener("mousedown", (event) => {
      const centerX = this.position.x + this.width / 2;
      const centerY = this.position.y + this.height / 2;
      this._projectiles.push(
        new Projectile(
          this._ctx,
          this,
          { x: centerX, y: centerY },
          { x: this.viewDirection.x, y: this.viewDirection.y },
        ),
      );
    });
  }

  /** @param {Screen} screen */
  #renderHealthBar(screen) {
    screen.context.fillStyle = "red";
    screen.context.fillRect(
      this.position.x,
      this.position.y - this.height / 2,
      this.width - this.width * (this.currenHealth / this.maxHealth),
      10,
    );

    screen.context.fillStyle = "green";
    screen.context.fillRect(
      this.position.x + this.width * (1 - this.currenHealth / this.maxHealth),
      this.position.y - this.height / 2,
      this.width * (this.currenHealth / this.maxHealth),
      10,
    );
  }

  /** @param {Screen} screen */
  #renderPlayerModel(screen) {
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

    screen.context.beginPath();
    screen.context.moveTo(topLeft.x, topLeft.y);
    screen.context.lineTo(topRight.x, topRight.y);
    screen.context.lineTo(bottomRight.x, bottomRight.y);
    screen.context.lineTo(bottomLeft.x, bottomLeft.y);
    screen.context.closePath();

    screen.context.fillStyle = "blue";
    screen.context.fill();
  }
}
