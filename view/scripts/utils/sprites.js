/**
 *
 * @returns {boolean}
 */
export function checkIfObjectsIntersect(object1, object2) {
  const xAxisCollision1 =
    object1.position.x <= object2.position.x + object2.width;

  const xAxisCollision2 =
    object2.position.x <= object1.position.x + object1.width;

  const yAxisCollision1 =
    object1.position.y <= object2.position.y + object2.height;

  const yAxisCollision2 =
    object2.position.y <= object1.position.y + object1.height;

  return (
    xAxisCollision1 && xAxisCollision2 && yAxisCollision1 && yAxisCollision2
  );
}
