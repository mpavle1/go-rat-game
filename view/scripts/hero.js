import { InputHandler } from "./inputHandler.js";
import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";
import { calculateAngleBetweenTwoPoints } from "./utils/math.js";
import { Wizzard } from "./wizzard.js";
import { World } from "./world.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class Hero extends Wizzard {
  /**
   * @param {InputHandler} inputHandler
   * @param {Projectile[]} projectiles
   * @param {World} world
   */
  constructor(inputHandler, projectiles, world) {
    super(document.getElementById("wizzard"), {
      x: Math.random() * world.width,
      y: Math.random() * world.height,
    });

    this.inputHandler = inputHandler;
    this.projectiles = projectiles;
    this.world = world;

    this.#handleFire();
  }

  update() {
    this.#handleMovement();
    this.#handleRotation();
  }

  /** @param {Screen} screen */
  render(screen) {
    this.renderPlayerModel(screen, {
      x: screen.width / 2,
      y: screen.height / 2,
    });
    this.renderHealthBar(screen, {
      x: screen.width / 2,
      y: screen.height / 2,
    });
  }

  #handleMovement() {
    const pressedKeys = this.inputHandler.downKeys;

    if (pressedKeys.includes("a")) {
      this.position.x -= this.speed;

      if (this.position.x <= -this.width / 2) {
        this.position.x = -this.width / 2;
      }
    }

    if (pressedKeys.includes("d")) {
      this.position.x += this.speed;
      if (this.position.x >= this.world.width - this.width / 2) {
        this.position.x = this.world.width - this.width / 2;
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
      if (this.position.y >= this.world.height - this.height / 2) {
        this.position.y = this.world.height - this.height / 2;
      }
    }
  }

  #handleRotation() {
    this.pointerPosition = this.inputHandler.mousePosition;

    this.pointerAngle = calculateAngleBetweenTwoPoints(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
      this.pointerPosition.x,
      this.pointerPosition.y,
    );
  }

  #handleFire() {
    document.getElementById("canvas").addEventListener("mousedown", () => {
      const centerX = this.position.x + this.width / 2;
      const centerY = this.position.y + this.height / 2;

      // TODO: Projektil ne ide gde je kliknuto sto je verovatno vezano i sa renderovanjem
      this.projectiles.push(
        new Projectile(
          this,
          { x: centerX, y: centerY },
          { x: this.pointerPosition.x, y: this.pointerPosition.y },
          this.world,
        ),
      );
    });
  }
}
