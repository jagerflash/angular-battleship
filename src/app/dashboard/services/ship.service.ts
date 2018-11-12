import { Injectable } from '@angular/core';

type RotationAngle = 0 | 90 | 180 | 270;

export class Position {
  constructor(public x = 0, public y = 0) {}
}

export type ShipType = 'L-Shape' | 'I-Shape' | 'Two-Shape';

export interface IShip {
  id: number;
  isDestroied: boolean;
  decks: Position[];
  type: ShipType;
  status: string;

  rotate(angle: RotationAngle);

  destroy();
}

abstract class Ship implements IShip {
  id: number;
  isDestroied: boolean;
  decks: Position[];
  type: ShipType;
  status: string;

  constructor() {
    const angle = Math.round(Math.random() * 3) * 90 as RotationAngle;
    this.rotate(angle);
  }

  rotate(angle: RotationAngle ) { }

  destroy() {
    this.isDestroied = true;
  }
}

class LShapeShip extends Ship {
  constructor(public id: number) {
    super();

    this.type = 'L-Shape';
  }

  rotate(angle: RotationAngle) {
    if (angle === 0) {
      this.decks = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, 2),
        new Position(1, 2),
      ];
    } else if (angle === 90) {
      this.decks = [
        new Position(0, 0),
        new Position(1, 0),
        new Position(2, 0),
        new Position(0, 1),
      ];
    } else if (angle === 180) {
      this.decks = [
        new Position(0, 0),
        new Position(1, 0),
        new Position(1, 1),
        new Position(1, 2),
      ];
    } else if (angle === 270) {
      this.decks = [
        new Position(2, 0),
        new Position(0, 1),
        new Position(1, 1),
        new Position(2, 1),
      ];
    }
  }
}

class IShapeShip extends Ship {
  constructor(public id: number) {
    super();

    this.type = 'I-Shape';
  }

  rotate(angle: RotationAngle) {
    if (angle === 90 || angle === 270) {
      this.decks = [
        new Position(0, 0),
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];
    } else {
      this.decks = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, 2),
        new Position(0, 3),
      ];
    }
  }
}

class TwoShapeShip extends Ship {
  constructor(public id: number) {
    super();

    this.type = 'Two-Shape';
  }

  rotate(angle: RotationAngle) {
    if (angle === 90 || angle === 270) {
      this.decks = [
        new Position(0, 0),
        new Position(1, 0),
      ];
    } else {
      this.decks = [
        new Position(0, 0),
        new Position(0, 1),
      ];
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private id: number;
  constructor() {
    this.id = 0;
  }

  create(type: ShipType): Ship {
    this.id++;

    switch (type) {
      case 'I-Shape': return new IShapeShip(this.id);
      case 'L-Shape': return new LShapeShip(this.id);
      case 'Two-Shape': return new TwoShapeShip(this.id);
    }
  }
}
