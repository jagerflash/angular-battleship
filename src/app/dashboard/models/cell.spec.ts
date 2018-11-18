import { Cell, CellState } from './cell';
import { TestBed } from '@angular/core/testing';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created defaulty', () => {
    const cell = new Cell(0);

    expect(cell.id).toEqual(0);
    expect(cell.isBusy).toBeFalsy();
    expect(cell.hidden).toBeTruthy();
    expect(cell.isShip || cell.isShield).not.toBeTruthy();
  });

  it('should set state', () => {
    const cell = new Cell(0);

    cell.setState(CellState.Sunk);
    expect(cell.state === CellState.Sunk);
    cell.setState(CellState.Hide);
    expect(cell.state === CellState.Hide);
    cell.setState(CellState.Missed);
    expect(cell.state === CellState.Missed);
    cell.setState(CellState.Show);
    expect(cell.state === CellState.Show);
  });

  it('should set shield', () => {
    const cell = new Cell(0);
    const shipOneId = 12;
    const shipTwoId = 13;
    cell.setShield(shipOneId);
    cell.setShield(shipTwoId);

    expect(cell.isShield).toBeTruthy();
    expect(cell.shieldShips).toEqual([shipOneId, shipTwoId]);
  });

  it('should set ship', () => {
    const cell = new Cell(0);
    const shipId = 12;
    cell.setShip(shipId);

    expect(cell.isShip).toBeTruthy();
    expect(cell.shipId).toEqual(shipId);
  });

  it('should set hide', () => {
    const cell = new Cell(0);

    cell.hide();

    expect(cell.hidden).toBeTruthy();
  });

  it('could be reset', () => {
    const cell = new Cell(0);

    cell.setShip(12);
    cell.reset();

    expect(cell.isShip).toBeFalsy();
  });

});
