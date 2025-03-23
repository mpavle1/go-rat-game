/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */
export class Screen {
  constructor(elementId) {
    /** @type {HTMLCanvasElement} */
    this._canvas = document.getElementById(elementId);
    /** @type {CanvasRenderingContext2D} */
    this._ctx = this._canvas.getContext("2d");

    this.width = 800;
    this.height = 600;

    this._canvas.width = this.width;
    this._canvas.height = this.height;

    /** @type {Position} */
    this.position = { x: 0, y: 0 };
  }

  get context() {
    return this._ctx;
  }

  get screenPosition() {
    return this.position;
  }

  get screenDimenstion() {
    return { width: this.width, height: this.height };
  }

  /** @param {Position} position */
  setPosition(position) {
    this.position = {
      x: position.x + this.width / 2,
      y: position.y + this.height / 2,
    };
  }

  // TODO: Srediti da se ovde uzima u obzir i dimenzije elementa
  /**
   * @param {Position} position
   * @returns {boolean}
   */
  isElementInScreen(position) {
    if (position.x > this.position.x + this.width) {
      return false;
    }
    if (position.x < 0) {
      return false;
    }
    if (position.y > this.position.y + this.height) {
      return false;
    }
    if (position.y < 0) {
      return false;
    }
    return true;
  }
}
