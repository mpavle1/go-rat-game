import { Screen } from "./screen.js";

export class World {
  constructor() {
    this.width = 5000;
    this.height = 5000;
  }

  /**
   * @param {Screen} screen
   */
  render(screen) {
    const screenPositon = screen.screenPosition;
    const screenDimenstion = screen.screenDimenstion;

    screen.context.fillStyle = "#9b7653";
    screen.context.fillRect(
      screenPositon.x - screenDimenstion.width / 2,
      screenPositon.y - screenDimenstion.height / 2,
      this.width,
      this.height,
    );

    screen.context.strokeStyle = "darkred";
    screen.context.lineWidth = screenDimenstion.width / 2;
    screen.context.strokeRect(
      screenPositon.x - screenDimenstion.width / 2,
      screenPositon.y - screenDimenstion.height / 2,
      this.width,
      this.height,
    );
  }
}
