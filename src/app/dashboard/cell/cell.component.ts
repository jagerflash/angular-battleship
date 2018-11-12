import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

export type CellState = 'hide' | 'damaged' | 'missed';

export class Shield {
  enable: boolean;
  shipIds: number[];

  constructor() {
    this.shipIds = [];
    this.enable = false;
  }
}

class Ship {
  enable: boolean;
  id: number;

  constructor() {
    this.enable = false;
  }
}

export class Cell {
  type: CellState;
  busy: boolean;
  shield: Shield;
  ship: Ship;

  constructor(public id: number) {
    this.type = 'hide';
    this.busy = false;
    this.shield = new Shield();
    this.ship = new Ship();
  }
}

@Component({
  selector: 'dashboard-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit {
  @HostBinding('class.damaged') get isDamaged() {
    return this.type === 'damaged';
  }

  @HostBinding('class.missed') get isMissed() {
    return this.type === 'missed';
  }

  @HostBinding('class.hide') get isHide() {
    return this.type === 'hide';
  }

  @Input() type: CellState;

  constructor() { }

  ngOnInit() { }

}
