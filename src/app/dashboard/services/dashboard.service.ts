import { Injectable } from '@angular/core';
import { IShip } from '../models/ship';
import { Position, ShipFitCombination, RotationAngle } from './../models/matter';
import { Cell, CellState } from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private cells: Cell[];
  private ships: IShip[];
  private width;
  private height;

  constructor() {
    const defaultSize = 10;
    this.config(defaultSize, defaultSize);

    this.clean();
  }

  clean() {
    this.cells.forEach(cell => cell.reset());
    this.ships = [];
  }

  config(width: number, height: number) {
    const sizeMax = 50;
    const sizeMin = 7;

    width = Math.max(width, sizeMin);
    width = Math.min(width, sizeMax);

    this.width = width;
    this.height = height;

    this.cells = new Array(this.width * this.height).fill(null)
      .map(
        (itm, ind) => new Cell(ind)
      );
  }

  drawShip(startCellPos: Position, ship: IShip) {
    if (this.getShipById(ship.id)) {
      return;
    }

    const shipDecks = ship.getDecks();
    const isShipFit = this.testShipFit(startCellPos, ship);

    if (isShipFit) {
      shipDecks.forEach(deckPos => {
        const pos = Position.sum(startCellPos, deckPos);
        const cell = this.getCell(pos);

        if (cell) {
          cell.setShip(ship.id);
        }
      });
      this.ships.push(ship);
      this.setShipShield(startCellPos, ship.id);
    }
  }

  drawShipRandomly(ship: IShip) {
    const dashboardSize = this.width * this.height;
    const сombinations: ShipFitCombination[] = [];

    for (let i = 0; i < dashboardSize; i++) {
        const pos = this.toPosFromLine(i, this.width, this.height);

        for (let a = 0; a <= 270; a += 90) {
          const angle = a as RotationAngle;

          ship.rotate(angle);
          const isShipFit = this.testShipFit(pos, ship);

          if (isShipFit) {
            const combination = new ShipFitCombination(angle, pos);
            сombinations.push(combination);
          }
        }
    }

    const randomCombination = сombinations[
      Math.round(Math.random() * сombinations.length)
    ];

    if (randomCombination) {
      ship.rotate(randomCombination.angle);

      this.drawShip(randomCombination.position, ship);
    }
  }

  testShipFit(pos: Position, ship: IShip): boolean {
    const shipDecks = ship.getDecks();

    const isFit = shipDecks.every(deckPosition => {
      const cellNum = this.toLineArrayIndex(pos) + this.toLineArrayIndex(deckPosition);
      const cell = this.cells[cellNum];
      const screenLimit = pos.x + deckPosition.x < this.width;

      return cell && cell.hidden && !cell.isBusy && screenLimit;
    });

    return isFit;
  }

  showShip(shipId: number) {
    this.cells.forEach(cell => {
      if (cell.isShip && cell.shipId === shipId) {
        cell.setState(CellState.Sunk);
        this.showShipSheild(shipId);
      }
    });
  }

  shoot(hitCell: Cell) {
    if (hitCell.isShip) {
      this.ships.find(ship => ship.id === hitCell.shipId)
        .sink();

      this.cells.forEach(cell => {
        if (cell.shipId === hitCell.shipId) {
          cell.setState(CellState.Sunk);
        }
        if (cell.isShield && cell.shieldShips.indexOf(hitCell.shipId) > -1) {
          cell.setState(CellState.Missed);
        }
      });
    } else if (hitCell.hidden) {
      hitCell.setState(CellState.Missed);
    }
  }

  getCells(): Cell[][] {
    const twoDemCells: Cell[][] = [];
    for (let y = 0; y < this.height; y++) {
      twoDemCells[y] = [];
      for (let x = 0; x < this.width; x++) {
        const cell = this.cells[this.width * y + x];
        twoDemCells[y].push(cell);
      }
    }

    return twoDemCells;
  }

  getAliveShipsLength() {
    return this.ships.length - this.ships.filter(ship => ship.sunk).length;
  }

  private getCell(pos: Position): Cell {
    const cellsLength = this.width * this.height;
    const cellIndex = this.toLineArrayIndex(pos);

    if (cellIndex >= 0 && cellIndex < cellsLength) {
      return this.cells[cellIndex];
    }

    return null;
  }

  private setShipShield(startPos: Position, shipId: number) {
    const ship = this.getShipById(shipId);
    const decks = ship.getDecks();

    decks.forEach(deckPos => {
      const cellPos = Position.sum(startPos, deckPos);
      const pointsAroundCell = 9;

      for (let i = 0; i < pointsAroundCell; i++) {
        const pos = this.toPosFromLine(i, 3, 3);
        const shieldPos = new Position(
          cellPos.x + pos.x - 1,
          cellPos.y + pos.y - 1
        );
        const withinLimits = shieldPos.x < this.width && shieldPos.x >= 0;
        const cell = this.getCell(shieldPos);

        if (cell && !cell.isShip && withinLimits) {
          cell.setShield(ship.id);
        }
      }
    });
  }

  private showShipSheild(shipId: number) {
    this.cells.forEach(cell => {
      const shipShield = cell.shieldShips.indexOf(shipId);
      if (shipShield) {
        cell.setState(CellState.Missed);
      }
    });
  }

  private getShipById(shipId: number): IShip {
    return this.ships.find(ship => ship.id === shipId);
  }

  private toLineArrayIndex(position: Position): number {
    return position.y * this.width + position.x;
  }

  private toPosFromLine(index: number, width: number, height: number): Position {
    const x = index % width;
    const y = Math.floor(index / height);

    return new Position(x, y);
  }
}
