import { By } from '@angular/platform-browser';
import { ShipService } from './services/ship.service';
import { DashboardService } from './services/dashboard.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [ DashboardService, ShipService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cell change state', () => {
    let firstCell = fixture.debugElement.query(By.css('dashboard-cell'));

    const modelCells = fixture.componentInstance.cells;
    const firstCellInModel = modelCells[0][0];

    expect(firstCell.nativeElement.classList.contains('hide')).toBeTruthy();
    fixture.componentInstance.onCellClick(firstCellInModel);
    fixture.detectChanges();

    firstCell = fixture.debugElement.query(By.css('dashboard-cell'));
    expect(firstCell.nativeElement.classList.contains('hide')).toBeFalsy();
  });

  it('should ship by sunk after the hit', () => {
    const modelCells = fixture.componentInstance.cells.reduce((acc, itm) => {
      return acc.concat(itm);
    });

    const shipId = 1; // L-shaped
    const minShieldCellsLength = 3;
    const maxShieldCellsLength = 14;
    const shipCells = modelCells.filter(cell => cell['ship'].enable && cell['ship'].id === shipId);

    fixture.componentInstance.onCellClick(shipCells[0]); // trigger click
    fixture.detectChanges();

    const sunkShipCells = fixture.debugElement.queryAll(By.css('dashboard-cell.sunk'));
    const shieldShipCells = fixture.debugElement.queryAll(By.css('dashboard-cell.missed'));

    const isShieldDisplayed =
      shieldShipCells.length > minShieldCellsLength &&
      shieldShipCells.length <= maxShieldCellsLength;

    expect(sunkShipCells.length).toEqual(shipCells.length);
    expect(isShieldDisplayed).toBeTruthy();
  });

});
