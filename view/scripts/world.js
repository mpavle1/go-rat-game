import { Screen } from "./screen.js";

export class World {
  image = null;
  constructor() {
    this.width = 2000;
    this.height = 2000;

    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    const pattern = ctx.createPattern(
      document.getElementById("volcano_floor"),
      "repeat",
    );
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // store the generate map as this image texture
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    // clear context
    ctx = null;
  }

  /** @param {Screen} screen */
  render(screen) {
    screen.context.drawImage(
      this.image,
      screen.position.x - screen.width / 2,
      screen.position.y - screen.height / 2,
      screen.width,
      screen.height,
      0,
      0,
      screen.width,
      screen.height,
    );
  }
}
