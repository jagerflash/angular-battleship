import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';
import { CellState } from '../models/cell';
import { By } from 'protractor';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change sunk style after input change', () => {
    component.state = CellState.Sunk;
    fixture.detectChanges();

    const inputEl: DOMTokenList = fixture.elementRef.nativeElement.classList;
    expect(inputEl.contains('sunk')).toBeTruthy();
  });

  it('should change missed style after input change', () => {
    component.state = CellState.Missed;
    fixture.detectChanges();

    const inputEl: DOMTokenList = fixture.elementRef.nativeElement.classList;
    expect(inputEl.contains('missed')).toBeTruthy();
  });

  it('should change hide style after input change', () => {
    component.state = CellState.Hide;
    fixture.detectChanges();

    const inputEl: DOMTokenList = fixture.elementRef.nativeElement.classList;
    expect(inputEl.contains('hide')).toBeTruthy();
  });
});
