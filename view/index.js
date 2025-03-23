import { Game } from "./scripts/game.js";

window.addEventListener("load", function () {
  const game = new Game();

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;

    game.update(deltaTime);
    game.render();

    requestAnimationFrame(animate);
  }

  animate(0);
});
