import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Cell } from './cell/cell.component';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipsLeft: number;
  cells: Cell[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.resetShips();
    this.cells = this.dashboardService.cellItems;
    this.shipsLeft = this.dashboardService.aliveShipsLength;
  }

  onCellClick(cell: Cell) {
    if (this.shipsLeft > 0) {
      this.dashboardService.shoot(cell);
      this.cells = this.dashboardService.cellItems;
      this.shipsLeft = this.dashboardService.aliveShipsLength;
    }
  }

  resetShips() {
    this.dashboardService.resetShips();
    this.shipsLeft = this.dashboardService.aliveShipsLength;
  }
}
