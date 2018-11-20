import { Injectable } from '@angular/core';
import { ShipType, IShip, LShapeShip, IShapeShip, DotShapeShip } from '../models/ship';
import { RotationAngle } from '../models/matter';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private id: number;

  constructor() {
    this.id = 0;
  }

  create(type: ShipType, angle?: RotationAngle): IShip {
    this.id++;
    let newShip: IShip;

    switch (type) {
      case ShipType.LShaped:
        newShip = new LShapeShip(this.id);
        break;
      case ShipType.IShaped:
        newShip = new IShapeShip(this.id);
        break;
      case ShipType.DotShaped:
        newShip = new DotShapeShip(this.id);
        break;
    }

    if (angle !== undefined) {
      newShip.rotate(angle);
    }

    return newShip;
  }
}
