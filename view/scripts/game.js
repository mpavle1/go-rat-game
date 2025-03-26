import { World } from "./world.js";
import { InputHandler } from "./inputHandler.js";
import { Hero } from "./hero.js";
import { Projectile } from "./projectile.js";
import { Screen } from "./screen.js";
import { Enemy } from "./enemy.js";
import { checkIfObjectsIntersect } from "./utils/sprites.js";
import { Wizzard } from "./wizzard.js";

export class Game {
  constructor() {
    /** @type {World} */
    this.world = new World();

    /** @type {InputHandler} */
    this.inputHandler = new InputHandler();

    /** @type {Projectile[]} */
    this.projectiles = [];

    /** @type {number} */
    this.timeDiff = 0;

    this.currentPlayer = new Hero(
      this.inputHandler,
      this.projectiles,
      this.world,
    );

    /** @type {Wizzard[]} */
    this.players = [this.currentPlayer, new Enemy(this.world)];

    /** @type {Screen} */
    this.screen = new Screen("canvas", this.currentPlayer);
  }

  update() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();

      for (let j = 0; j < this.players.length; j++) {
        if (this.players[j].isDead()) {
          continue;
        }
        if (this.projectiles[i].owner === this.players[j]) {
          continue;
        }

        if (checkIfObjectsIntersect(this.players[j], this.projectiles[i])) {
          this.players[j].takeDamage(this.projectiles[i].damage);
          this.projectiles.splice(i, 1);
          break;
        }
      }
    }

    this.players.forEach((player) => {
      player.update();
    });

    this.screen.update();
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
    this.screen.context.clearRect(0, 0, canvas.width, canvas.height);

    this.world.render(this.screen);
    this.players.forEach((enemy) => enemy.render(this.screen));
    this.projectiles.forEach((projectile) => projectile.render(this.screen));
  }
}
