import { LShapeShip, ShipType, IShapeShip, DotShapeShip } from './ship';
import { TestBed } from '@angular/core/testing';
import { RotationAngle } from './matter';


describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created defaulty', () => {
    const shipId = 12;
    const angle: RotationAngle = 0;
    const lship = new LShapeShip(shipId, angle);
    const iship = new IShapeShip(shipId, angle);
    const dship = new DotShapeShip(shipId, angle);

    expect(lship.id).toEqual(12);
    expect(lship.sunk).toBeFalsy();
    expect(lship.getDecks().length).toEqual(4);
    expect(lship.type).toEqual(ShipType.LShaped);
    expect(iship.type).toEqual(ShipType.IShaped);
    expect(iship.getDecks().length).toEqual(4);
    expect(dship.type).toEqual(ShipType.DotShaped);
    expect(dship.getDecks().length).toEqual(1);
  });

  it('could be sunk', () => {
    const ship = new LShapeShip(0);

    ship.sink();

    expect(ship.sunk).toBeTruthy();
  });

});
