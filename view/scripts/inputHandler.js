export class InputHandler {
  /** @typedef {string[]}  */
  #keyDownKeys = [];

  constructor() {
    this.#initKeyDown();
  }

  /**
   * @returns {string[]}
   */
  get keyDownArray() {
    return this.#keyDownKeys;
  }

  #initKeyDown() {
    window.addEventListener("keydown", (event) => {
      if (this.#keyDownKeys.includes(event.key)) {
        return;
      }
      this.#keyDownKeys.push(event.key);
    });
    window.addEventListener("keyup", (event) => {
      this.#keyDownKeys.splice(this.#keyDownKeys.indexOf(event.key), 1);
    });
  }
}
