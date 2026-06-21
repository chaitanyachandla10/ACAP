import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../environments/environment';

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
  status: 'Active' | 'On Leave' | 'Remote';
  email?: string;
  location?: string;
}

const DEMO_DEPARTMENTS: DepartmentRecord[] = [
  { id: 1, departmentname: 'Product & Engineering', Managername: 'Priya Nair', manager: [{ noofManager: 2, developer: 18, tester: 6 }] },
  { id: 2, departmentname: 'Customer Experience', Managername: 'Arjun Mehta', manager: [{ noofManager: 1, developer: 7, tester: 4 }] },
  { id: 3, departmentname: 'People Operations', Managername: 'Neha Kapoor', manager: [{ noofManager: 1, developer: 4, tester: 2 }] }
];

const DEMO_EMPLOYEES: EmployeeRecord[] = [
  { id: 1048, name: 'Aisha Sharma', title: 'Senior Product Designer', department: 'Product & Engineering', status: 'Active', email: 'aisha@acap.io', location: 'Bengaluru' },
  { id: 1047, name: 'Rohan Patel', title: 'Frontend Engineer', department: 'Product & Engineering', status: 'Remote', email: 'rohan@acap.io', location: 'Pune' },
  { id: 1046, name: 'Sana Verma', title: 'People Partner', department: 'People Operations', status: 'On Leave', email: 'sana@acap.io', location: 'Mumbai' },
  { id: 1045, name: 'Kabir Singh', title: 'QA Lead', department: 'Product & Engineering', status: 'Active', email: 'kabir@acap.io', location: 'Hyderabad' },
  { id: 1044, name: 'Mira Joshi', title: 'Customer Success Manager', department: 'Customer Experience', status: 'Active', email: 'mira@acap.io', location: 'Delhi' },
  { id: 1043, name: 'Dev Malhotra', title: 'Platform Engineer', department: 'Product & Engineering', status: 'Remote', email: 'dev@acap.io', location: 'Chennai' }
];

@Injectable({ providedIn: 'root' })
export class AcapService {
  private readonly apiUrl = environment.apiUrl;
  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private readonly httpClient: HttpClient) { }

  getDepartments(): Observable<DepartmentRecord[]> {
    return this.httpClient.get<DepartmentRecord[]>(`${this.apiUrl}/departments`).pipe(
      retry({ count: 1, delay: 300 }),
      catchError(() => of(DEMO_DEPARTMENTS))
    );
  }

  addDepartment(data: DepartmentRecord): Observable<{ message: string; department: DepartmentRecord }> {
    return this.httpClient.post<{ message: string; department: DepartmentRecord }>(
      `${this.apiUrl}/departments`, data, this.httpOptions
    ).pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  getEmployees(): Observable<EmployeeRecord[]> {
    return this.httpClient.get<EmployeeRecord[]>(`${this.apiUrl}/employees`).pipe(
      retry({ count: 1, delay: 300 }),
      catchError(() => of(DEMO_EMPLOYEES))
    );
  }

  getManagers(): Observable<ManagerAllocation[]> {
    return this.httpClient.get<ManagerAllocation[]>(`${this.apiUrl}/managers`).pipe(
      retry({ count: 1, delay: 300 }),
      catchError(() => of(DEMO_DEPARTMENTS.flatMap(department => department.manager)))
    );
  }
}
