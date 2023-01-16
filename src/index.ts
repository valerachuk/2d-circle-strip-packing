import { getDistanceFromStripLeftToCircleRight } from "./math";
import { Circle, StripPackingInput, Vector2d } from "./types";

const enum StripEdges {
  left = -3,
  top = -2,
  bottom = -1,
}

export class Strip {
  private readonly _packedCircles: Array<Circle> = [];
  private readonly _pendingPlacementRadii: Array<number>;
  private readonly _stripWidth: number;

  private _pendingRadiusToPlace: number | null = null;
  private _pendingCornerPositions: Array<Vector2d> | null = null;

  constructor(stripPackingInput: StripPackingInput) {
    this._pendingPlacementRadii = stripPackingInput.circleRadii;
    this._stripWidth = stripPackingInput.stripWidth;
  }

  public pendingPlacements(): number {
    return this._pendingPlacementRadii.length;
  }

  public currentStripLength(): number {
    const distancesToMaxRight = this._packedCircles.map(
      getDistanceFromStripLeftToCircleRight
    );

    return Math.max(...distancesToMaxRight);
  }

  private _computeCornerPositions(): void {}
}
