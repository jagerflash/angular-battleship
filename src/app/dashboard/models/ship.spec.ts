import { LShapeShip, ShipType, IShapeShip, DotShapeShip } from './ship';
import { TestBed } from '@angular/core/testing';
import { RotationAngle } from './matter';


describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created defaulty', () => {
    const shipId = 0;

    const lship = new LShapeShip(shipId);
    const iship = new IShapeShip(shipId);
    const dship = new DotShapeShip(shipId);

    expect(lship.id).toEqual(shipId);
    expect(lship.sunk).toBeFalsy();
    expect(lship.getDecks().length).toEqual(4);
    expect(lship.type).toEqual(ShipType.LShaped);
    expect(iship.type).toEqual(ShipType.IShaped);
    expect(iship.getDecks().length).toEqual(4);
    expect(dship.type).toEqual(ShipType.DotShaped);
    expect(dship.getDecks().length).toEqual(1);
  });

  it('could be rotate', () => {
    const lship = new LShapeShip(0);
    const iship = new IShapeShip(1);

    lship.rotate(lship.rotations[0]); // 0 degr
    expect(lship.getDecks()).toBeDefined();
    lship.rotate(lship.rotations[1]); // 90 degr
    expect(lship.getDecks()).toBeDefined();
    lship.rotate(lship.rotations[2]); // 180 degr
    expect(lship.getDecks()).toBeDefined();
    lship.rotate(lship.rotations[3]); // 270 degr
    expect(lship.getDecks()).toBeDefined();

    iship.rotate(iship.rotations[0]); // 0 degr
    expect(iship.getDecks()).toBeDefined();
    iship.rotate(iship.rotations[1]); // 90 degr
    expect(iship.getDecks()).toBeDefined();
  });

  it('could be sunk', () => {
    const ship = new LShapeShip(0);

    ship.sink();

    expect(ship.sunk).toBeTruthy();
  });

});
