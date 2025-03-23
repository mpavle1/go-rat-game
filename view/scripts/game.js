import { World } from "./world.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";
import { Enemy } from "./enemy.js";
import { checkIfObjectsIntersect } from "./utils/sprites.js";

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

    /** @type {number} */
    this.timeDiff = 0;

    this._players = [
      new Player(
        this._screen._ctx,
        this._inputHandler,
        this.projectiles,
        this._world,
      ),
      new Enemy(this._screen._ctx, this.projectiles, this._world),
    ];
  }

  update() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();

      for (let j = 0; j < this._players.length; j++) {
        if (this._players[j].isDead()) {
          continue;
        }
        if (this.projectiles[i].owner === this._players[j]) {
          continue;
        }

        if (checkIfObjectsIntersect(this._players[j], this.projectiles[i])) {
          console.log("should be deleted", i);
          this._players[j].takeDamage(this.projectiles[i].damage);
          this.projectiles.splice(i, 1);
          break;
        }
      }
    }

    this._players.forEach((player) => {
      player.update();
    });
  }

  /**
   * @param {number} deltaTime
   */
  render(deltaTime) {
    // TODO: Proveriti ovo da li zapravo radi. Tj da li stvarno ovako imamo zakucano 60fps
    if (deltaTime < 1000 / 60) {
      this.timeDiff += deltaTime;
      return;
    }
    this.timeDiff = 0;
    this._screen._ctx.clearRect(0, 0, canvas.width, canvas.height);

    this._world.render(this._screen);
    this._players.forEach((enemy) => enemy.render(this._screen));
    this.projectiles.forEach((projectile) => projectile.render(this._screen));
  }
}
