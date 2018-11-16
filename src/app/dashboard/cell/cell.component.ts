import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { CellState } from '../models/cell';


@Component({
  selector: 'dashboard-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @HostBinding('class') private cellClass;

  @Input() set state(state: CellState) {
    this.cellClass = this.getClassNameByState(state);
    this._state = state;
  }

  private _state: CellState;

  constructor() { }

  private getClassNameByState (state: CellState) {
    return CellState[state].toLowerCase();
  }
}
