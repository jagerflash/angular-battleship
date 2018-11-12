import { TestBed } from '@angular/core/testing';

import { ShipService, ShipType, IShip } from './ship.service';

describe('ShipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShipService = TestBed.get(ShipService);
    expect(service).toBeTruthy();
  });

  it('could ship create', () => {
    const service: ShipService = TestBed.get(ShipService);
    const shipType: ShipType = 'L-Shape';
    const newShip: IShip = service.create(shipType);

    expect(newShip).toBeDefined();
  });
});
