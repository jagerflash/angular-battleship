import { CellComponent } from './cell/cell.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CellComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    CellComponent,
  ]
})
export class DashboardModule { }
