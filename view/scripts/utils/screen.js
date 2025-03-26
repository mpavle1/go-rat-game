// import { Screen } from "../screen";

///**
// * @param {import("../screen").Vector2d} position
// * @param {Screen} screen
// * @returns {import("../screen").Vector2d}
// */
export function offsetPostitionRelativeToScreen(position, screen) {
  return {
    x: position.x + screen.getPosition().x,
    y: position.y + screen.getPosition().y,
  };
}
