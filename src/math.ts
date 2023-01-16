import { Circle, Vector2d } from "./types";

export const euclideanDistance = (a: Vector2d, b: Vector2d): number =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

export const circlesDistance = (a: Circle, b: Circle): number =>
  euclideanDistance(a.center, b.center) - (a.radius + b.radius);

export const doCirclesIntersect = (a: Circle, b: Circle): boolean =>
  circlesDistance(a, b) < 0;

export const circleDistanceToStripLeft = (circle: Circle): number =>
  circle.center.x - circle.radius;

export const circleDistanceToStripBottom = (circle: Circle): number =>
  circle.center.y - circle.radius;

export const circleDistanceToStripTop = (
  circle: Circle,
  stripWidth: number
): number => stripWidth - (circle.center.y + circle.radius);

export const doesCirceIntersectWithStripLeft = (circle: Circle): boolean =>
  circleDistanceToStripLeft(circle) < 0;

export const doesCirceIntersectWithStripBottom = (circle: Circle): boolean =>
  circleDistanceToStripBottom(circle) < 0;

export const doesCircleIntersectWithStripTop = (
  circle: Circle,
  stripWidth: number
): boolean => circleDistanceToStripTop(circle, stripWidth) < 0;

export const getDistanceFromStripLeftToCircleRight = (circle: Circle): number =>
  circle.center.x + circle.radius;

export const getCornerPositionsInBetweenCircles = (
  circleA: Circle,
  circleB: Circle,
  radius: number
): Array<Vector2d> => {
  throw new Error("Not implemented.");
};
