import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AcapService, DepartmentRecord, EmployeeRecord, ManagerAllocation } from '../acap.service';

@Component({ selector: 'app-dashboard', standalone: false, templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css'] })
export class DashboardComponent implements OnInit {
  records: DepartmentRecord[] = [];
  recentEmployees: EmployeeRecord[] = [];
  errorMessage = '';
  loading = true;
  departmentsCount = 0;
  employeesCount = 0;
  managersCount = 0;
  activeEmployees = 0;
  totalBudget = 0;

  constructor(private readonly acapService: AcapService) { }

  ngOnInit(): void {
    forkJoin({
      departments: this.acapService.getDepartments(),
      employees: this.acapService.getEmployees(),
      managers: this.acapService.getManagers()
    }).subscribe({
      next: ({ departments, employees, managers }) => {
        this.records = departments;
        this.recentEmployees = employees.slice(0, 5);
        this.departmentsCount = departments.length;
        this.employeesCount = employees.length;
        this.activeEmployees = employees.filter(employee => employee.status === 'Active').length;
        this.managersCount = managers.reduce((total, allocation) => total + allocation.noofManager, 0);
        this.totalBudget = departments.reduce((total, record) => total + this.getDepartmentTotal(record), 0);
        this.loading = false;
      },
      error: () => { this.errorMessage = 'Dashboard data could not be loaded.'; this.loading = false; }
    });
  }

  getAllocationTotal(allocation: ManagerAllocation): number {
    return allocation.developer * 1000 + allocation.tester * 500 + allocation.noofManager * 300;
  }

  getDepartmentTotal(record: DepartmentRecord): number {
    return record.manager.reduce((total, allocation) => total + this.getAllocationTotal(allocation), 0);
  }

  getTeamSize(record: DepartmentRecord): number {
    return record.manager.reduce((total, item) => total + item.developer + item.tester + item.noofManager, 0);
  }

  getBudgetPercent(record: DepartmentRecord): number {
    return this.totalBudget ? Math.round(this.getDepartmentTotal(record) / this.totalBudget * 100) : 0;
  }

  initials(name: string): string { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
}
