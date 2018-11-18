import { RotationAngle } from './matter';
import { Position } from './matter';

export enum ShipType {
  LShaped,
  IShaped,
  DotShaped
}

export interface IShip {
  id: number;
  sunk: boolean;
  type: ShipType;

  getDecks(): Position[];
  rotate(angle: RotationAngle): void;
  sink(): void;
}

abstract class Ship implements IShip {
  private _id: number;
  private _sunk: boolean;
  private _decks: Position[];
  private _type: ShipType;

  constructor(id: number, angle?: RotationAngle) {
    if (!angle) {
      angle = Math.round(Math.random() * 3) * 90 as RotationAngle;
    }

    this._id = id;
    this.rotate(angle);
  }

  abstract rotate(angle: RotationAngle );

  get sunk() {
    return this._sunk;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  getDecks() {
    return this._decks;
  }

  sink() {
    this._sunk = true;
  }

  protected setType(type: ShipType) {
    this._type = type;
  }

  protected setDecks(decks: Position[]) {
    this._decks = decks;
  }

}

export class LShapeShip extends Ship {
  constructor(id: number, angle?: RotationAngle) {
    super(id, angle);

    this.setType(ShipType.LShaped);
  }

  rotate(angle: RotationAngle) {
    let decks: Position[];

    switch (angle) {
      case 0:
        decks = [
          new Position(0, 0),
          new Position(0, 1),
          new Position(0, 2),
          new Position(1, 2),
        ];
        break;
      case 90:
        decks = [
          new Position(0, 0),
          new Position(1, 0),
          new Position(2, 0),
          new Position(0, 1),
        ];
        break;
      case 180:
        decks = [
          new Position(0, 0),
          new Position(1, 0),
          new Position(1, 1),
          new Position(1, 2),
        ];
        break;
      case 270:
        decks = [
          new Position(2, 0),
          new Position(0, 1),
          new Position(1, 1),
          new Position(2, 1),
        ];
        break;
    }

    this.setDecks(decks);
  }
}

export class IShapeShip extends Ship {
  constructor(id: number, angle?: RotationAngle) {
    super(id, angle);

    this.setType(ShipType.IShaped);
  }

  rotate(angle: RotationAngle) {
    let decks: Position[];

    switch (angle) {
      case 90:
      case 270:
        decks = [
          new Position(0, 0),
          new Position(1, 0),
          new Position(2, 0),
          new Position(3, 0),
        ];
        break;
      default:
        decks = [
          new Position(0, 0),
          new Position(0, 1),
          new Position(0, 2),
          new Position(0, 3),
        ];
        break;
    }

    this.setDecks(decks);
  }
}

export class DotShapeShip extends Ship {
  constructor(id: number, angle?: RotationAngle) {
    super(id, angle);

    this.setType(ShipType.DotShaped);

    const decks = [ new Position(0, 0) ];
    this.setDecks(decks);
  }

  rotate() { }
}
