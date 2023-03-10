import {
  circleDistanceToStripBottom,
  circleDistanceToStripLeft,
  circleDistanceToStripTop,
  circlesDistance,
  getCornerPositionsBetweenCircleAndBottomEdge,
  getCornerPositionsBetweenCircleAndLeftEdge,
  getCornerPositionsBetweenCircleAndTopEdge,
  getCornerPositionsBetweenCircles,
  getCornerPositionsBetweenLeftAndBottomEdge,
  getCornerPositionsBetweenLeftAndTopEdge,
  getDistanceFromStripLeftToCircleRight,
} from "./math";
import {
  Circle,
  StripPackingInput,
  StripPackingOutput,
  Vector2d,
} from "./types";
import { getMinBySelector } from "./utils";

const enum StripEdges {
  left = -3,
  bottom = -2,
  top = -1,
}

export class StripPackingState {
  private readonly _packedCircles: Array<Circle>;
  private readonly _pendingPlacementRadii: Array<number>;
  private readonly _stripWidth: number;

  public constructor(another: StripPackingState);
  public constructor(stripPackingInput: StripPackingInput);

  constructor(stripPackingInput: StripPackingInput | StripPackingState) {
    if (stripPackingInput instanceof StripPackingState) {
      this._packedCircles = stripPackingInput._packedCircles.map((circle) =>
        Object.assign({}, circle)
      );
      this._pendingPlacementRadii =
        stripPackingInput._pendingPlacementRadii.concat();
      this._stripWidth = stripPackingInput._stripWidth;

      return;
    }

    this._packedCircles = [];
    this._pendingPlacementRadii = stripPackingInput.circleRadii;
    this._stripWidth = stripPackingInput.stripWidth;
  }

  public pendingPlacementsCount(): number {
    return this._pendingPlacementRadii.length;
  }

  public currentStripLength(): number {
    const distancesToMaxRight = this._packedCircles.map(
      getDistanceFromStripLeftToCircleRight
    );

    return Math.max(...distancesToMaxRight);
  }

  public isCompleted(): boolean {
    return this.pendingPlacementsCount() === 0;
  }

  public getOutput(): StripPackingOutput {
    if (!this.isCompleted()) {
      throw new Error("The solution is not found yet.");
    }

    const stripLength = this.currentStripLength();

    return {
      circles: this._packedCircles,
      stripLength,
    };
  }

  public placeNext(pendingPlacementIndex: number): number {
    const radiusToPlace = this._pendingPlacementRadii.splice(
      pendingPlacementIndex,
      1
    )[0];

    const pendingPlacements: Array<{
      circle: Circle;
      minNeighborDistance: number;
    }> = [];

    for (let i = -3; i < this._packedCircles.length; i++) {
      for (let j = i + 1; j < this._packedCircles.length; j++) {
        const cornerPositions = this._getCornerPositions(i, j, radiusToPlace);

        for (const circleCenter of cornerPositions) {
          const circle: Circle = {
            center: circleCenter,
            radius: radiusToPlace,
          };

          const minNeighborDistance = this._getMinDistanceToNeighbor(
            circle,
            i,
            j
          );
          if (minNeighborDistance === null) {
            continue;
          }

          pendingPlacements.push({
            circle,
            minNeighborDistance,
          });
        }
      }
    }

    const { circle: circleToPlace, minNeighborDistance } = getMinBySelector(
      pendingPlacements,
      ({ minNeighborDistance }) => minNeighborDistance
    );
    this._packedCircles.push(circleToPlace);

    return minNeighborDistance;
  }

  private _getCornerPositions(
    i: number,
    j: number,
    radiusToPlace: number
  ): Array<Vector2d> {
    let cornerPositions: Array<Vector2d>;
    if (i === StripEdges.left && j === StripEdges.top) {
      cornerPositions = getCornerPositionsBetweenLeftAndTopEdge(
        radiusToPlace,
        this._stripWidth
      );
    } else if (i === StripEdges.left && j === StripEdges.bottom) {
      cornerPositions =
        getCornerPositionsBetweenLeftAndBottomEdge(radiusToPlace);
    } else if (i === StripEdges.bottom && j === StripEdges.top) {
      cornerPositions = [];
    } else if (i === StripEdges.left) {
      const packagedCircleJ = this._packedCircles[j];
      cornerPositions = getCornerPositionsBetweenCircleAndLeftEdge(
        packagedCircleJ,
        radiusToPlace
      );
    } else if (i === StripEdges.top) {
      const packagedCircleJ = this._packedCircles[j];
      cornerPositions = getCornerPositionsBetweenCircleAndTopEdge(
        packagedCircleJ,
        radiusToPlace,
        this._stripWidth
      );
    } else if (i === StripEdges.bottom) {
      const packagedCircleJ = this._packedCircles[j];
      cornerPositions = getCornerPositionsBetweenCircleAndBottomEdge(
        packagedCircleJ,
        radiusToPlace
      );
    } else {
      const packagedCircleI = this._packedCircles[i];
      const packagedCircleJ = this._packedCircles[j];

      cornerPositions = getCornerPositionsBetweenCircles(
        packagedCircleI,
        packagedCircleJ,
        radiusToPlace
      );
    }

    return cornerPositions;
  }

  private _getMinDistanceToNeighbor(
    circle: Circle,
    iToSkip: number,
    jToSkip: number
  ): number | null {
    let minDistance: number | null = null;
    for (let i = -3; i < this._packedCircles.length; i++) {
      if (i === iToSkip || i === jToSkip) {
        continue;
      }

      let currentDistance: number;
      if (i === StripEdges.bottom) {
        currentDistance = circleDistanceToStripBottom(circle);
      } else if (i === StripEdges.top) {
        currentDistance = circleDistanceToStripTop(circle, this._stripWidth);
      } else if (i === StripEdges.left) {
        currentDistance = circleDistanceToStripLeft(circle);
      } else {
        const packagedCircle = this._packedCircles[i];
        currentDistance = circlesDistance(circle, packagedCircle);
      }

      if (currentDistance < 0) {
        return null;
      }

      if (minDistance === null || currentDistance < minDistance) {
        minDistance = currentDistance;
      }
    }

    return minDistance;
  }
}
