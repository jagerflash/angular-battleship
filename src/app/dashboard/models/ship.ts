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
  rotations: RotationAngle[];

  getDecks(): Position[];
  rotate(angle: RotationAngle): void;
  sink(): void;
}

abstract class Ship implements IShip {
  private _id: number;
  private _sunk: boolean;
  private _decks: Position[];
  private _type: ShipType;
  private _rotations: RotationAngle[];

  constructor(id: number) {
    this._id = id;
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

  get rotations() {
    return this._rotations;
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

  protected setRotations(rotations: RotationAngle[]) {
    this._rotations = rotations;
    this.rotate(rotations[0]);
  }

}

export class LShapeShip extends Ship {
  constructor(id: number) {
    super(id);

    this.setType(ShipType.LShaped);
    this.setRotations([0, 90, 180, 270]);
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
  constructor(id: number) {
    super(id);

    this.setType(ShipType.IShaped);
    this.setRotations([0, 90]);
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
  constructor(id: number) {
    super(id);

    this.setType(ShipType.DotShaped);
    this.setRotations([0]);

    const decks = [ new Position(0, 0) ];
    this.setDecks(decks);
  }

  rotate() { }
}
