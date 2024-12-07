import { World } from "./world.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";

export class Game {
  constructor() {
    /** @type {Screen} */
    this._screen = new Screen("canvas");

    /** @type {World} */
    this._world = new World();

    /** @type {InputHandler} */
    this._inputHandler = new InputHandler();

    /** @type {Projectile[]} */
    this.projectiles = [];

    /** @type {Player} */
    this._player = new Player(
      this._screen._ctx,
      this._inputHandler,
      this.projectiles,
      this._world,
    );

    this.timeDiff = 0;
  }

  update() {
    this._player.update(this._screen);
    this._screen.setPosition(this._player.position);

    this.projectiles.forEach((projectile, index) => {
      projectile.update(this._screen);
      if (projectile.shouldBeDeleted) {
        this.projectiles.splice(index, 1);
      }
    });
  }

  /**
   * @param {number} deltaTime
   */
  render(deltaTime) {
    // TODO: Proveriti ovo da li zapravo radi. Tj da li stvarno ovako imamo
    // zakucano 60fps
    if (deltaTime < 1000 / 60) {
      this.timeDiff += deltaTime;
      return;
    }
    this.timeDiff = 0;
    this._screen._ctx.clearRect(0, 0, canvas.width, canvas.height);

    this._world.render(this._screen);
    this._player.render(this._screen);
    this.projectiles.forEach((projectile) => projectile.render(this._screen));
  }
}
