import { Component, OnInit } from '@angular/core';
import { AcapService, EmployeeRecord } from '../../acap.service';

@Component({ selector: 'app-employee-list', standalone: false, templateUrl: './employee-list.component.html', styleUrls: ['./employee-list.component.css'] })
export class EmployeeListComponent implements OnInit {
  employees: EmployeeRecord[] = [];
  filteredEmployees: EmployeeRecord[] = [];
  query = '';
  status = 'All';
  loading = true;

  constructor(private readonly acapService: AcapService) { }
  ngOnInit(): void { this.acapService.getEmployees().subscribe(data => { this.employees = data; this.applyFilters(); this.loading = false; }); }
  applyFilters(): void {
    const term = this.query.trim().toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      (this.status === 'All' || employee.status === this.status) &&
      (!term || `${employee.name} ${employee.title} ${employee.department}`.toLowerCase().includes(term))
    );
  }
  initials(name: string): string { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
  trackByEmployee(_: number, employee: EmployeeRecord): number { return employee.id; }
}
