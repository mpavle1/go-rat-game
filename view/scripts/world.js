import { Screen } from "./screen.js";

export class World {
  constructor() {
    this.width = 500;
    this.height = 500;
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    // const screenPositon = screen.screenPosition;
    // const screenDimenstion = screen.screenDimenstion;

    // screen.context.fillStyle = "#9b7653";
    // screen.context.fillRect(
    //   0,
    //   0,
    //   // screenPositon.x - screenDimenstion.width / 2,
    //   // screenPositon.y - screenDimenstion.height / 2,
    //   this.width,
    //   this.height,
    // );
    //
    // screen.context.strokeStyle = "darkred";
    // // TODO: remove later
    // screen.context.lineWidth = 100;
    // screen.context.lineWidth = screenDimenstion.width / 2;
    const pattern = screen.context.createPattern(
      document.getElementById("volcano_floor"),
      "repeat",
    );
    screen.context.fillStyle = pattern;
    screen.context.fillRect(0, 0, screen._canvas.width, screen._canvas.height); // Dr

    // debug
    screen.context.strokeRect(
      0,
      0,
      // screenPositon.x - screenDimenstion.width / 2,
      // screenPositon.y - screenDimenstion.height / 2,
      this.width,
      this.height,
    );
    screen.context.strokeRect(0, 0, this.width, this.height);
  }
}
