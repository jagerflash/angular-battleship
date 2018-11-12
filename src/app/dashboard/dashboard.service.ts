import { Injectable } from '@angular/core';
import { ShipService, ShipType, IShip, Position } from './ship.service';
import { Cell } from './cell/cell.component';

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
      cell.busy = false;
      cell.type = 'hide';
      cell.ship.id = undefined;
      cell.shield.enable = false;
      cell.shield.shipIds = [];
      cell.ship.enable = false;
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
    if (cell.ship.enable) {
      this.cells.forEach(c => {
        if (c.ship.id === cell.ship.id) {
          c.type = 'damaged';
        }
        if (c.shield.enable && c.shield.shipIds.indexOf(cell.ship.id) > -1) {
          c.type = 'missed';
        }
      });
    this.ships
      .find(ship => ship.id === cell.ship.id)
      .destroy();

    } else if (cell.type === 'hide') {
      cell.type = 'missed';
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

      this.cells[cellNum].busy = true;
      this.cells[cellNum].ship.enable = true;
      this.cells[cellNum].ship.id = ship.id;

      this.cells[cellNum].shield.enable = false;

      for (let i = 0; i < 9; i++) {
        const p = {
          x: coords.x + i % 3 - 1,
          y: coords.y + Math.floor(i / 3) - 1
        };
        const point = this.toLineArray(p);
        if (this.cells[point] && !this.cells[point].ship && p.x < 10 && p.x >= 0) {
          this.cells[point].shield.enable = true;
          this.cells[point].shield.shipIds.push(ship.id);
          this.cells[point].busy = true;
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

      return this.cells[cellNum] &&
        this.cells[cellNum].type === 'hide' &&
        !this.cells[cellNum].busy &&
        (randomPlace.x + deckPosition.x < 10);
    });

    return hasPlace ? randomPlace : false;
  }

  private toLineArray(position: Position): number {
    return position.y * this.size + position.x;
  }
}
