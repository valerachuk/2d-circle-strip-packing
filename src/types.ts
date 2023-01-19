export type StripPackingInput = {
  stripWidth: number;
  circleRadii: Array<number>;
};

export type Vector2d = {
  x: number;
  y: number;
};

export type Circle = {
  radius: number;
  center: Vector2d;
};

export type StripPackingOutput = {
  stripLength: number;
  circles: Array<Circle>;
};
