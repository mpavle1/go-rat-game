import { InputHandler } from "./inputHandler.js";
import { Projectile } from "./projectile.js";
import { calculateAngleBetweenTwoPoints } from "./utils/math.js";
import { Wizzard } from "./wizzard.js";
import { World } from "./world.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class Player extends Wizzard {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {InputHandler} inputHandler
   * @param {Projectile[]} projectiles
   * @param {World} world
   */
  constructor(ctx, inputHandler, projectiles, world) {
    super(ctx, projectiles, world, document.getElementById("wizzard"), {
      x: Math.random() * world.width,
      y: Math.random() * world.height,
    });
    this._inputHandler = inputHandler;

    this.#handleFire();
  }

  update() {
    this.#handleMovement();
    this.#handleRotation();
  }

  #handleMovement() {
    const pressedKeys = this._inputHandler.downKeys;

    if (pressedKeys.includes("a")) {
      this.position.x -= this.speed;

      if (this.position.x <= -this.width / 2) {
        this.position.x = -this.width / 2;
      }
    }

    if (pressedKeys.includes("d")) {
      this.position.x += this.speed;
      if (this.position.x >= this._world.width - this.width / 2) {
        this.position.x = this._world.width - this.width / 2;
      }
    }

    if (pressedKeys.includes("w")) {
      this.position.y -= this.speed;
      if (this.position.y <= -this.height / 2) {
        this.position.y = -this.height / 2;
      }
    }

    if (pressedKeys.includes("s")) {
      this.position.y += this.speed;
      if (this.position.y >= this._world.height - this.height / 2) {
        this.position.y = this._world.height - this.height / 2;
      }
    }
  }

  #handleRotation() {
    this.pointerPosition = this._inputHandler.mousePosition;

    this.pointerAngle = calculateAngleBetweenTwoPoints(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
      this.pointerPosition.x,
      this.pointerPosition.y,
    );
  }

  #handleFire() {
    this._ctx.canvas.addEventListener("mousedown", () => {
      const centerX = this.position.x + this.width / 2;
      const centerY = this.position.y + this.height / 2;

      this._projectiles.push(
        new Projectile(
          this,
          { x: centerX, y: centerY },
          { x: this.pointerPosition.x, y: this.pointerPosition.y },
          this._world,
        ),
      );
    });
  }
}
