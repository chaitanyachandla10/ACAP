import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ManagerAllocation {
  noofManager: number;
  developer: number;
  tester: number;
}

export interface DepartmentRecord {
  id?: number;
  departmentname: string;
  Managername: string;
  manager: ManagerAllocation[];
}

export interface EmployeeRecord {
  id: number;
  name: string;
  title: string;
  department: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcapService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getDepartments(): Observable<DepartmentRecord[]> {
    return this.httpClient.get<DepartmentRecord[]>(`${this.apiUrl}/getdata`).pipe(
      catchError(() => of([]))
    );
  }

  addDepartment(data: DepartmentRecord) {
    return this.httpClient.post<{ message: string; department: DepartmentRecord }>(
      `${this.apiUrl}/datasend`,
      data,
      this.httpOptions
    );
  }

  getEmployees(): Observable<EmployeeRecord[]> {
    const fallbackEmployees: EmployeeRecord[] = [
      { id: 1, name: 'Aisha Sharma', title: 'Software Engineer', department: 'Development', status: 'Active' },
      { id: 2, name: 'Rohan Patel', title: 'QA Analyst', department: 'Quality Assurance', status: 'Active' },
      { id: 3, name: 'Sana Verma', title: 'HR Specialist', department: 'Human Resources', status: 'On Leave' }
    ];

    return this.httpClient.get<EmployeeRecord[]>(`${this.apiUrl}/employees`).pipe(
      catchError(() => of(fallbackEmployees))
    );
  }

  getManagers(): Observable<ManagerAllocation[]> {
    const fallbackManagers: ManagerAllocation[] = [
      { noofManager: 2, developer: 12, tester: 5 },
      { noofManager: 1, developer: 8, tester: 3 }
    ];

    return this.httpClient.get<ManagerAllocation[]>(`${this.apiUrl}/managers`).pipe(
      catchError(() => of(fallbackManagers))
    );
  }
}
