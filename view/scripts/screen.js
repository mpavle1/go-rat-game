export class Screen {
  constructor(elementId) {
    /** @type {HTMLCanvasElement} */
    this._canvas = document.getElementById(elementId);

    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    /** @typedef {CanvasRenderingContext2D} */
    this._ctx = this._canvas.getContext("2d");

    this.#addScreenResizer();
  }

  #addScreenResizer() {
    const canvas = this._canvas;
    window.addEventListener("resize", function (event) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}
