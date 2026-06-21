import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AcapService } from '../acap.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  it('calculates dashboard totals', async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], declarations: [DashboardComponent],
      providers: [{ provide: AcapService, useValue: {
        getDepartments: () => of([{ departmentname: 'Engineering', Managername: 'Priya', manager: [{ noofManager: 1, developer: 2, tester: 1 }] }]),
        getEmployees: () => of([{ id: 1, name: 'Aisha', title: 'Engineer', department: 'Engineering', status: 'Active' }]),
        getManagers: () => of([{ noofManager: 1, developer: 2, tester: 1 }])
      }}]
    }).compileComponents();
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.totalBudget).toBe(2800);
  });
});
