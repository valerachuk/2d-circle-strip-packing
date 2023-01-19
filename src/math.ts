import { Circle, Vector2d } from "./types";

export const solveSquareEquation = (
  a: number,
  b: number,
  c: number
): [] | [number] | [number, number] => {
  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) {
    return [];
  }

  if (discriminant === 0) {
    return [-b / (2 * a)];
  }

  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  return [x1, x2];
};

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

export const getDistanceFromStripLeftToCircleRight = (circle: Circle): number =>
  circle.center.x + circle.radius;

/**
  x', y' - ?


  1)

  { (x_1 - x') ^ 2 + (y_1 - y') ^ 2 = (r_1 + r') ^ 2;
  { (x_2 - x') ^ 2 + (y_2 - y') ^ 2 = (r_2 + r') ^ 2;


  2)

  { -2 x_1 x' + (x')^2 + x_1^2 + (y')^2 - 2 y_1 y' + y_1^2 = 2 r_1 r' + (r')^2 + r_1^2;
  { -2 x_2 x' + (x')^2 + x_2^2 + (y')^2 - 2 y_2 y' + y_2^2 = 2 r_2 r' + (r')^2 + r_2^2;


  3) first minus second

  { -2 x_1 x' + 2 x_2 x' + x_1^2 - x_2^2 - 2 y_1 y' + 2 y_2 y' + y_1^2 - y_2^2 = 2 r_1 r' - 2 r_2 r' + r_1^2 - r_2^2;


  4)

  { -2 x_1 x' + 2 x_2 x' - 2 y_1 y' + 2 y_2 y' + y_1^2 - y_2^2 = 2 r_1 r' - 2 r_2 r' + r_1^2 - r_2^2 - x_1^2 + x_2^2;


  5)

  { -2 x_1 x' + 2 x_2 x' - 2 y_1 y' + 2 y_2 y' = 2 r_1 r' - 2 r_2 r' + r_1^2 - r_2^2 - x_1^2 + x_2^2 - y_1^2 + y_2^2;


  6) substitute "2 r_1 r' - 2 r_2 r' + r_1^2 - r_2^2 - x_1^2 + x_2^2 - y_1^2 + y_2^2" with "a";

  { -2 x_1 x' + 2 x_2 x' - 2 y_1 y' + 2 y_2 y' = a;


  7)

  { 2 (x_2 - x_1) x' + 2 (y_2 - y_1) y' = a;


  8)

  { y' = (a - 2 (x_2 - x_1) x') / (2 (y_2 - y_1));

  9) substitute "2 (x_2 - x_1)" with "b" and
    substitute "2 (y_2 - y_1)" with "c"

  { y' = (a - b x') / c;


  10) return to 2(1) and move all constants to right.

  { -2 x_1 x' + (x')^2 + (y')^2 - 2 y_1 y' = 2 r_1 r' + (r')^2 + r_1^2 - x_1^2 - y_1^2;


  11) substitute "2 r_1 r' + (r')^2 + r_1^2 - x_1^2 - y_1^2" with "d".

  { -2 x_1 x' + (x')^2 + (y')^2 - 2 y_1 y' = d;


  10) replace all "y'" in 2(1) with (9)

  { -2 x_1 x' + (x')^2 + ((a - b x') / c)^2 - 2 y_1 ((a - b x') / c) = d;

  11) expand

  { a^2/c^2 - (2 a b x')/c^2 - (2 a y_1)/c + (b^2 (x')^2)/c^2 + (2 b y_1 x')/c + (x')^2 - 2 x_1 x' = d;

  12)

  { a^2 - 2 a b x' - 2 a c y_1 + b^2 (x')^2 + 2 b c y_1 x' + c^2 (x')^2 - 2 c^2 x_1 x' = d c^2;

  13)

  { (x')^2 (b^2 + c^2) + x' (-2 a b + 2 b c y_1 - 2 c^2 x_1) + a^2 - 2 a c y_1 - d c^2 = 0;

  A = (b^2 + c^2);
  B = (-2 a b + 2 b c y_1 - 2 c^2 x_1);
  C = (a^2 - 2 a c y_1 - d c^2);

 */
export const getCornerPositionsBetweenCircles = (
  circleA: Circle,
  circleB: Circle,
  radius: number
): Array<Vector2d> => {
  const {
    center: { x: x_1, y: y_1 },
    radius: r_1,
  } = circleA;

  const {
    center: { x: x_2, y: y_2 },
    radius: r_2,
  } = circleB;

  const r_ = radius;

  const a =
    2 * r_1 * r_ -
    2 * r_2 * r_ +
    r_1 ** 2 -
    r_2 ** 2 -
    x_1 ** 2 +
    x_2 ** 2 -
    y_1 ** 2 +
    y_2 ** 2;
  const b = 2 * (x_2 - x_1);
  const c = 2 * (y_2 - y_1);
  const d = 2 * r_1 * r_ + r_ ** 2 + r_1 ** 2 - x_1 ** 2 - y_1 ** 2;

  const f_x = (x: number) => (a - b * x) / c;

  const A = b ** 2 + c ** 2;
  const B = -2 * a * b + 2 * b * c * y_1 - 2 * c ** 2 * x_1;
  const C = a ** 2 - 2 * a * c * y_1 - d * c ** 2;

  const discriminant = B ** 2 - 4 * A * C;

  if (discriminant < 0) {
    return [];
  }

  return solveSquareEquation(A, B, C).map((x) => ({ x, y: f_x(x) }));
};

/**
  y' - ?


  1)

  { x' = r';
  { (x_1 - x') ^ 2 + (y_1 - y') ^ 2 = (r_1 + r') ^ 2;


  2) replace x' with r'

  { (x_1 - r') ^ 2 + (y_1 - y') ^ 2 = (r_1 + r') ^ 2;


  3)

  { (y_1 - y') ^ 2 = (r_1 + r') ^ 2 - (x_1 - r') ^ 2;


  4)

  { y_1 ^ 2 - 2 y_1 y' + (y') ^ 2  = (r_1 + r') ^ 2 - (x_1 - r') ^ 2;


  5)

  { (y') ^ 2 - 2 y_1 y' + y_1 ^ 2 - (r_1 + r') ^ 2 + (x_1 - r') ^ 2 = 0;


  6)

  A = 1;
  B = (-2 y_1);
  C = (y_1 ^ 2 - (r_1 + r') ^ 2 + (x_1 - r') ^ 2);

 */
export const getCornerPositionsBetweenCircleAndLeftEdge = (
  circle: Circle,
  radius: number
): Array<Vector2d> => {
  const {
    center: { x: x_1, y: y_1 },
    radius: r_1,
  } = circle;

  const r_ = radius;

  const A = 1;
  const B = -2 * y_1;
  const C = y_1 ** 2 - (r_1 + r_) ** 2 + (x_1 - r_) ** 2;

  return solveSquareEquation(A, B, C).map((y) => ({ x: r_, y }));
};

/**
  x' - ?


  1)

  { y' = r';
  { (x_1 - x') ^ 2 + (y_1 - y') ^ 2 = (r_1 + r') ^ 2;


  2) replace y' with r'

  { (x_1 - x') ^ 2 + (y_1 - r') ^ 2 = (r_1 + r') ^ 2;


  3)

  { (x_1 - x') ^ 2 = (r_1 + r') ^ 2 - (y_1 - r') ^ 2;


  4)

  { x_1^2 - 2 x_1 x' + (x')^2 = (r_1 + r') ^ 2 - (y_1 - r') ^ 2;


  5)

  { (x')^2 - 2 x_1 x' + x_1^2 - (r_1 + r') ^ 2 + (y_1 - r') ^ 2;


  6)

  A = 1;
  B = (-2 x_1);
  C = (x_1^2 - (r_1 + r') ^ 2 + (y_1 - r') ^ 2);

 */
export const getCornerPositionsBetweenCircleAndBottomEdge = (
  circle: Circle,
  radius: number
): Array<Vector2d> => {
  const {
    center: { x: x_1, y: y_1 },
    radius: r_1,
  } = circle;

  const r_ = radius;

  const A = 1;
  const B = -2 * x_1;
  const C = x_1 ** 2 - (r_1 + r_) ** 2 + (y_1 - r_) ** 2;

  return solveSquareEquation(A, B, C).map((x) => ({ x, y: r_ }));
};

/**
  x' - ?


  1)

  { y' = W - r';
  { (x_1 - x') ^ 2 + (y_1 - y') ^ 2 = (r_1 + r') ^ 2;


  2) replace y' with r'

  { (x_1 - x') ^ 2 + (y_1 - W + r') ^ 2 = (r_1 + r') ^ 2;


  3)

  { (x_1 - x') ^ 2 = (r_1 + r') ^ 2 - (y_1 - W + r') ^ 2;


  4)

  { x_1^2 - 2 x_1 x' + (x')^2 = (r_1 + r') ^ 2 - (y_1 - W + r') ^ 2;


  5)

  { (x')^2 - 2 x_1 x' + x_1^2 - (r_1 + r') ^ 2 + (y_1 - W + r') ^ 2;


  6)

  A = 1;
  B = (-2 x_1);
  C = (x_1^2 - (r_1 + r') ^ 2 + (y_1 - W + r') ^ 2);

 */
export const getCornerPositionsBetweenCircleAndTopEdge = (
  circle: Circle,
  radius: number,
  stripWidth: number
): Array<Vector2d> => {
  const {
    center: { x: x_1, y: y_1 },
    radius: r_1,
  } = circle;

  const r_ = radius;

  const A = 1;
  const B = -2 * x_1;
  const C = x_1 ** 2 - (r_1 + r_) ** 2 + (y_1 - stripWidth + r_) ** 2;

  return solveSquareEquation(A, B, C).map((x) => ({ x, y: stripWidth - r_ }));
};

export const getCornerPositionsBetweenLeftAndBottomEdge = (
  radius: number
): Array<Vector2d> => {
  return [
    {
      x: radius,
      y: radius,
    },
  ];
};

export const getCornerPositionsBetweenLeftAndTopEdge = (
  radius: number,
  stripWidth: number
): Array<Vector2d> => {
  return [
    {
      x: radius,
      y: stripWidth - radius,
    },
  ];
};
