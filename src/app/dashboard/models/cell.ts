export enum CellState {
  Hide,
  Sunk,
  Missed,
  Show
}

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
  state: CellState;

  private busy: boolean;
  private shield: Shield;
  private ship: Ship;

  constructor(public id: number) {
    this.state = CellState.Hide;
    this.busy = false;
    this.shield = new Shield();
    this.ship = new Ship();
  }

  get hidden () {
    return this.state === CellState.Hide;
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
    this.state = CellState.Hide;
    this.busy = false;
  }

  show() {
    this.state = CellState.Show;
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

  setState(state: CellState) {
    this.state = state;
  }

  reset() {
    this.ship.enable = false;
    this.ship.id = undefined;
    this.shield.enable = false;
    this.shield.shipIds = [];
    this.hide();
  }
}
