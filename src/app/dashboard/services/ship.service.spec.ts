import { ShipService } from './ship.service';
import { TestBed } from '@angular/core/testing';

import { ShipType, IShip, LShapeShip, IShapeShip, DotShapeShip } from '../models/ship';


describe('ShipService', () => {
  let service: ShipService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ship create all kind of ship type', () => {
    const LShapedShip = service.create(ShipType.LShaped, 0);
    const IShapedShip = service.create(ShipType.IShaped, 0);
    const DotShapedShip = service.create(ShipType.DotShaped, 0);

    expect(LShapedShip).not.toBeNull();
    expect(IShapedShip).not.toBeNull();
    expect(DotShapedShip).not.toBeNull();
  });

  it('should id increment', () => {
    const ship_1 = service.create(ShipType.DotShaped, 0);
    const ship_2 = service.create(ShipType.DotShaped, 0);
    const ship_3 = service.create(ShipType.DotShaped, 0);

    expect(ship_1.id).toEqual(1);
    expect(ship_2.id).toEqual(2);
    expect(ship_3.id).toEqual(3);
  });
});
