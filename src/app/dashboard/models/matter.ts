export type RotationAngle = 0 | 90 | 180 | 270;

export class Position {
  constructor(public x = 0, public y = 0) {}

  static sum(A: Position, B: Position) {
    return new Position(A.x + B.x, A.y + B.y);
  }
}

export class ShipFitCombination {
  constructor(
    public angle: RotationAngle,
    public position: Position
  ) {}
}
