import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcapService } from '../../acap.service';

export interface EmployeeRecord {
  id: number;
  name: string;
  title: string;
  department: string;
  status: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<EmployeeRecord[]> = new Observable();

  constructor(private acapService: AcapService) { }

  ngOnInit(): void {
    this.employees$ = this.acapService.getEmployees();
  }

  trackByEmployee(index: number, employee: EmployeeRecord): number {
    return employee.id;
  }
}
