import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });

  it('could dashboard create', () => {
    const service: DashboardService = TestBed.get(DashboardService);

    service.resetShips();
    expect(service.cellItems).not.toBeUndefined();
    expect(service.cellItems.length).toEqual(100);
  });
});
