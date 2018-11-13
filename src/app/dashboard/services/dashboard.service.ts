import { Injectable } from '@angular/core';
import { ShipService, ShipType, IShip, Position } from './ship.service';
import { Cell } from '../cell/cell.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private cells: Cell[];
  private ships: IShip[];
  private size = 10;

  constructor(
    private shipService: ShipService
  ) {
    this.cells = new Array(this.size * this.size).fill(null)
      .map(
        (itm, ind) => new Cell(ind)
      );

    this.resetDashboard();
  }

  private resetDashboard() {
    this.cells.forEach(cell => {
      cell.reset();
    });
  }

  resetShips() {
    this.ships = [];

    this.resetDashboard();

    this.addShip('L-Shape');
    this.addShip('I-Shape');
    this.addShip('Two-Shape');
    this.addShip('Two-Shape');
  }

  shoot(cell: Cell) {
    if (cell.isShip) {
      this.cells.forEach(c => {
        if (c.shipId === cell.shipId) {
          c.mark('damaged');
        }
        if (c.isShield && c.shieldShips.indexOf(cell.shipId) > -1) {
          c.mark('missed');
        }
      });
    this.ships
      .find(ship => ship.id === cell.shipId)
      .destroy();

    } else if (cell.hidden) {
      cell.mark('missed');
    }
  }

  addShip(type: ShipType) {
    const ship = this.shipService.create(type);

    let isFoundPosition: Position | boolean = false;
    do {
      isFoundPosition = this.hasFreePlace(ship.decks);
    } while (!isFoundPosition);
    ship.decks.map(deckPosition => {
      const cellNum = this.toLineArray(isFoundPosition as Position) + this.toLineArray(deckPosition);
      const coords = new Position(
        (isFoundPosition as Position).x + deckPosition.x,
        (isFoundPosition as Position).y + deckPosition.y,
      );

      const shipCell = this.cells[cellNum];
      shipCell.setShip(ship.id);

      for (let i = 0; i < 9; i++) {
        const p = {
          x: coords.x + i % 3 - 1,
          y: coords.y + Math.floor(i / 3) - 1
        };
        const point = this.toLineArray(p);
        const shieldCell = this.cells[point];
        if (shieldCell && !shieldCell.isShip && p.x < 10 && p.x >= 0) {
          shieldCell.setShield(ship.id);
        }
      }
    });

    this.ships.push(ship);
  }

  get aliveShipsLength() {
    return this.ships.length - this.ships.filter(ship => ship.isDestroied).length;
  }

  get cellItems() {
    return this.cells;
  }

  private hasFreePlace(deckPositions: Position[]) {
    const randomPlace = new Position(
      Math.round(Math.random() * 9),
      Math.round(Math.random() * 9)
    );

    const hasPlace = deckPositions.every(deckPosition => {
      const cellNum = this.toLineArray(randomPlace) + this.toLineArray(deckPosition);
      const cell = this.cells[cellNum];
      const screenLimit = randomPlace.x + deckPosition.x < 10;

      return cell && cell.hidden && !cell.isBusy && screenLimit;
    });

    return hasPlace ? randomPlace : false;
  }

  private toLineArray(position: Position): number {
    return position.y * this.size + position.x;
  }
}
