/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

export class InputHandler {
  /** @typedef {string[]}  */
  #downKeys = [];
  /** @typedef {Position} */
  #mousePosition = { x: 0, y: 0 };

  constructor() {
    this.#initKeyDown();
    this.#initMouseMove();
  }

  /**
   * @returns {string[]}
   */
  get downKeys() {
    return this.#downKeys;
  }

  /**
   * @returns {Position}
   */
  get mousePosition() {
    return this.#mousePosition;
  }

  #initKeyDown() {
    window.addEventListener("keydown", (event) => {
      if (this.#downKeys.includes(event.key)) {
        return;
      }
      this.#downKeys.push(event.key);
    });
    window.addEventListener("keyup", (event) => {
      this.#downKeys.splice(this.#downKeys.indexOf(event.key), 1);
    });
  }

  #initMouseMove() {
    window.addEventListener("mousemove", (event) => {
      this.#mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    });
  }
}
