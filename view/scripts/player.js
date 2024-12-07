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
  pointerPosition = { x: 0, y: 0 };
  pointerAngle = 0;
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

  /**
   * @param {Screen} screen
   */
  update(screen) {
    this.#handleMovement();
    this.#handleRotation(screen);
  }

  // TODO: Videti kako da izbadcimo ctx iz ove metode
  #handleMovement() {
    const pressedKeys = this._inputHandler.downKeys;
    if (pressedKeys.includes("a")) {
      this.position.x -= 5;

      if (this.position.x <= 0) {
        this.position.x = 0;
      }
    }
    if (pressedKeys.includes("d")) {
      this.position.x += 5;
      if (this.position.x >= this._ctx.canvas.width - this.width) {
        this.position.x = this._ctx.canvas.width - this.width;
      }
    }
    if (pressedKeys.includes("w")) {
      this.position.y -= 5;
      if (this.position.y <= -this.height / 2) {
        this.position.y = -this.height / 2;
      }
    }
    if (pressedKeys.includes("s")) {
      this.position.y += 5;
      if (this.position.y >= this._ctx.canvas.height - this.height / 2) {
        this.position.y = this._ctx.canvas.height - this.height / 2;
      }
    }
  }

  /**
   * @param {Screen} screen
   */
  #handleRotation(screen) {
    this.pointerPosition = this._inputHandler.mousePosition;

    this.pointerAngle = calculateAngleBetweenTwoPoints(
      screen.width / 2 + this.width / 2,
      screen.height / 2 + this.height / 2,
      this.pointerPosition.x,
      this.pointerPosition.y,
    );
  }

  #handleFire() {
    this._ctx.canvas.addEventListener("mousedown", (event) => {
      const centerX = this.position.x + this.width / 2;
      const centerY = this.position.y + this.height / 2;
      this._projectiles.push(
        new Projectile(
          this,
          { x: centerX, y: centerY },
          { x: this.pointerPosition.x, y: this.pointerPosition.y },
        ),
      );
    });
  }

  /** @param {Screen} screen */
  #renderHealthBar(screen) {
    screen.context.fillStyle = "red";
    screen.context.fillRect(
      screen.width / 2 - this.width / 2,
      screen.height / 2 - this.height,
      this.width - this.width * (this.currenHealth / this.maxHealth),
      10,
    );

    screen.context.fillStyle = "green";
    screen.context.fillRect(
      screen.width / 2 +
        this.width / 2 -
        this.width * (this.currenHealth / this.maxHealth),
      screen.height / 2 - this.height,
      this.width * (this.currenHealth / this.maxHealth),
      10,
    );
  }

  /** @param {Screen} screen */
  #renderPlayerModel(screen) {
    const centerX = screen.width / 2;
    const centerY = screen.height / 2;

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
