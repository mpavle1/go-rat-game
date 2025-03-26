import { Wizzard } from "./wizzard.js";

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */
export class Screen {
  /**
   * @param {string} elementId
   * @param {Wizzard} unitToFollow
   */
  constructor(elementId, unitToFollow) {
    /** @type {HTMLCanvasElement} */
    this.canvas = document.getElementById(elementId);
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext("2d");

    this.width = 800;
    this.height = 600;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    /** @type {Position} */
    this.position = { x: 0, y: 0 };

    this.unitToFollow = unitToFollow;
  }

  get context() {
    return this.ctx;
  }

  update() {
    this.setPosition(this.unitToFollow.position);
  }

  /** @param {Position} position */
  setPosition(position) {
    this.position = {
      x: position.x,
      y: position.y,
    };
  }
}
