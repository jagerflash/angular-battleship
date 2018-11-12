import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export type CellType = 'show' | 'hide' | 'damage' | 'missed' | 'busy';

export class Shield {
  enable: boolean;
  shipIds: number[];

  constructor() {
    this.shipIds = [];
    this.enable = false;
  }
}

export class Cell {
  type: CellType;
  busy: boolean;
  position: Position;
  shipId: number;
  shield: Shield;
  ship: boolean;

  constructor() {
    this.type = 'hide';
    this.busy = false;
    this.shield = new Shield();
  }
}

@Component({
  selector: 'dashboard-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input() type: CellType;

  constructor() { }

  ngOnInit() { }

}
