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

    switch (type) {
      case ShipType.LShaped: return new LShapeShip(this.id, angle);
      case ShipType.IShaped: return new IShapeShip(this.id, angle);
      case ShipType.DotShaped: return new DotShapeShip(this.id, angle);
    }
  }
}
