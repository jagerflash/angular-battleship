import { ShipType } from './models/ship';
import { ShipService } from './services/ship.service';
import { DashboardService } from './services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Cell } from './models/cell';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipsLeft: number;
  cells: Cell[][];

  constructor(
    private dashboardService: DashboardService,
    private shipService: ShipService
  ) { }

  ngOnInit() {
    this.setInitShips();

    this.cells = this.dashboardService.getCells();
    this.shipsLeft = this.dashboardService.getAliveShipsLength();
  }

  onCellClick(cell: Cell) {
    if (this.shipsLeft > 0) {
      this.dashboardService.shoot(cell);
      this.cells = this.dashboardService.getCells();
      this.shipsLeft = this.dashboardService.getAliveShipsLength();
    }
  }

  resetShips() {
    this.dashboardService.clean();
    this.setInitShips();
    this.shipsLeft = this.dashboardService.getAliveShipsLength();
  }

  setInitShips() {
    const LShaped = this.shipService.create(ShipType.LShaped);
    const IShaped = this.shipService.create(ShipType.IShaped);
    const DotShaped1 = this.shipService.create(ShipType.DotShaped);
    const DotShaped2 = this.shipService.create(ShipType.DotShaped);

    this.dashboardService.drawShipRandomly(LShaped);
    this.dashboardService.drawShipRandomly(IShaped);
    this.dashboardService.drawShipRandomly(DotShaped1);
    this.dashboardService.drawShipRandomly(DotShaped2);
  }

  identify(ind, itm) {
    return itm.id;
  }
}
