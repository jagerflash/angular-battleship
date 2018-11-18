import { CellState } from './../models/cell';
import { Position } from './../models/matter';
import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { ShipService } from './ship.service';
import { ShipType } from '../models/ship';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let shipService: ShipService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    dashboardService = TestBed.get(DashboardService);
    shipService = TestBed.get(ShipService);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('should dashboard be created', () => {
    const defaultSize = 10 * 10;
    const cells = dashboardService.getCells().reduce((acc, item) => {
      return acc.concat(item);
    });

    expect(cells.length).toEqual(defaultSize);
  });

  it('should dashboard be cleaned', () => {
    const newShip = shipService.create(ShipType.IShaped);
    const startPosition = new Position(0, 0);

    dashboardService.drawShip(startPosition, newShip);
    dashboardService.clean();
    const cells = dashboardService.getCells().reduce((acc, item) => {
      return acc.concat(item);
    });
    const defaultCell = cells.every(cell => !cell.isBusy);

    expect(defaultCell).toBeTruthy();
  });

  it('could dashboard to be configurable', () => {
    const size = 20;
    dashboardService.config(20, 20);
    const cells = dashboardService.getCells().reduce((acc, item) => {
      return acc.concat(item);
    });

    expect(cells.length).toEqual(20 * 20);
  });

  it('could ship to be drawn', () => {
    const newShip = shipService.create(ShipType.DotShaped);
    const startPos = new Position(0, 0);
    dashboardService.drawShip(startPos, newShip);

    const cells = dashboardService.getCells();

    expect(cells[startPos.x][startPos.y].isShip).toBeTruthy();
  });

  it('could ship to be shot', () => {
    const newShip = shipService.create(ShipType.DotShaped);
    const startPos = new Position(0, 0);
    const shipCell = dashboardService.getCells()[startPos.x][startPos.y];

    dashboardService.drawShip(startPos, newShip);
    dashboardService.shoot(shipCell);
    const cells = dashboardService.getCells();
    const sunkShips = dashboardService.getAliveShipsLength();

    expect(sunkShips).toEqual(0);
    expect(cells[startPos.x][startPos.y].state).toEqual(CellState.Sunk);
  });

  it('could be drawn random ship', () => {
    const newShip = shipService.create(ShipType.DotShaped);
    dashboardService.drawShipRandom(newShip);

    const cells = dashboardService.getCells().reduce((acc, item) => acc.concat(item));
    const shipIsPresent = cells.some(cell => cell.isShip);

    expect(shipIsPresent).toBeTruthy();
  });

});
