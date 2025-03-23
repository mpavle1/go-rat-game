import { Projectile } from "./projectile.js";
import { Wizzard } from "./wizzard.js";
import { World } from "./world.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class Enemy extends Wizzard {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Projectile[]} projectiles
   * @param {World} world
   */
  constructor(ctx, projectiles, world) {
    super(ctx, projectiles, world, document.getElementById("enemy"), {
      x: Math.random() * world.width,
      y: Math.random() * world.height,
    });
  }
}
