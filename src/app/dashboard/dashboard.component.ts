import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AcapService, DepartmentRecord, ManagerAllocation } from '../acap.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  records: DepartmentRecord[] = [];
  errorMessage = '';
  departmentsCount = 0;
  employeesCount = 0;
  managersCount = 0;

  constructor(private acapservice: AcapService) { }

  ngOnInit(): void {
    forkJoin({
      departments: this.acapservice.getDepartments(),
      employees: this.acapservice.getEmployees(),
      managers: this.acapservice.getManagers()
    }).subscribe({
      next: ({ departments, employees, managers }) => {
        this.records = departments;
        this.departmentsCount = departments.length;
        this.employeesCount = employees.length;
        this.managersCount = managers.length;
      },
      error: () => {
        this.errorMessage = 'Unable to load dashboard data.';
      }
    });
  }

  getAllocationTotal(allocation: ManagerAllocation): number {
    return (allocation.developer * 1000) + (allocation.tester * 500) + (allocation.noofManager * 300);
  }

  getDepartmentTotal(record: DepartmentRecord): number {
    return record.manager.reduce((total, allocation) => total + this.getAllocationTotal(allocation), 0);
  }
}
