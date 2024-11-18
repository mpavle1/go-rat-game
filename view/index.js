import { Game } from "./scripts/game.js";

window.addEventListener("load", function () {
  console.log("Loaded script");

  const game = new Game();

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;
    // console.log({ deltaTime });
    game.render();
    game.update();

    requestAnimationFrame(animate);
  }

  animate(0);
});
