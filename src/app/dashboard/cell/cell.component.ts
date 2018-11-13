import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

export type CellState = 'hide' | 'damaged' | 'missed';

export class Shield {
  enable: boolean;
  shipIds: number[];

  constructor() {
    this.shipIds = [];
  }
}

class Ship {
  enable: boolean;
  id: number;
}

export class Cell {
  private type: CellState;
  private busy: boolean;
  private shield: Shield;
  private ship: Ship;

  constructor(public id: number) {
    this.type = 'hide';
    this.busy = false;
    this.shield = new Shield();
    this.ship = new Ship();
  }

  get hidden () {
    return this.type === 'hide';
  }

  get isShip () {
    return this.ship.enable;
  }

  get isShield () {
    return this.shield.enable;
  }

  get isBusy () {
    return this.busy;
  }

  hide() {
    this.type = 'hide';
    this.busy = false;
  }

  setShip(id: number) {
    this.ship.enable = true;
    this.ship.id = id;
    this.shield.enable = false;
    this.busy = true;
  }

  setShield(shipId: number) {
    this.shield.enable = true;
    this.shield.shipIds.push(shipId);
    this.busy = true;
  }

  get shieldShips() {
    return [...this.shield.shipIds];
  }

  get shipId() {
    if (this.ship.enable) {
      return this.ship.id;
    }
    return null;
  }

  mark(type: CellState) {
    this.type = type;
  }

  reset() {
    this.ship.enable = false;
    this.ship.id = undefined;
    this.shield.enable = false;
    this.shield.shipIds = [];
    this.hide();
  }
}

@Component({
  selector: 'dashboard-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit {
  @HostBinding('class') private cellClass;

  @Input() set type(value: CellState) {
    this.cellClass = value;
    this._type = value;
  }

  private _type: CellState;

  constructor() { }

  ngOnInit() { }

}
