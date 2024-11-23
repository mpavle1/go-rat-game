/**
 * @param {number} x
 * @param {number} y
 * @param {number} ox
 * @param {number} oy
 * @param {number} angle
 * @returns {Position}
 */
export function rotatePoint(x, y, ox, oy, angle) {
  const dx = x - ox;
  const dy = y - oy;
  const newX = ox + (dx * Math.cos(angle) - dy * Math.sin(angle));
  const newY = oy + (dx * Math.sin(angle) + dy * Math.cos(angle));

  return { x: newX, y: newY };
}

/**
 * @param {number} cx
 * @param {number} cy
 * @param {number} px
 * @param {number} py
 * @returns {number}
 */
export function calculateAngleBetweenTwoPoints(cx, cy, px, py) {
  const dx = px - cx;
  const dy = py - cy;

  return Math.atan2(dy, dx);
}
