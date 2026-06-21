import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcapService, DepartmentRecord } from '../acap.service';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  submitted = false;
  submitMessage = '';
  submitStatus: 'success' | 'error' | '' = '';

  constructor(private formBuilder: FormBuilder, private acapservice: AcapService) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      departmentname: ['', [Validators.required, Validators.minLength(2)]],
      managername: ['', [Validators.required, Validators.minLength(2)]],
      numberOfManager: ['', Validators.required],
      manager: this.formBuilder.array([])
    });
  }

  get f() {
    return this.departmentForm.controls;
  }

  get t(): FormArray {
    return this.f['manager'] as FormArray;
  }

  onChangeTickets(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const numberOfManager = Number(target.value) || 0;

    while (this.t.length < numberOfManager) {
      this.t.push(this.formBuilder.group({
        noofManager: ['', Validators.required],
        developer: ['', Validators.required],
        tester: ['', Validators.required]
      }));
    }

    while (this.t.length > numberOfManager) {
      this.t.removeAt(this.t.length - 1);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.submitMessage = '';
    this.submitStatus = '';

    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    const payload: DepartmentRecord = {
      departmentname: this.departmentForm.value.departmentname,
      Managername: this.departmentForm.value.managername,
      manager: this.departmentForm.value.manager.map((allocation: { noofManager: string; developer: string; tester: string; }) => ({
        noofManager: Number(allocation.noofManager),
        developer: Number(allocation.developer),
        tester: Number(allocation.tester)
      }))
    };

    this.acapservice.addDepartment(payload).subscribe({
      next: () => {
        this.submitMessage = 'Department saved successfully.';
        this.submitStatus = 'success';
        this.onReset();
      },
      error: () => {
        this.submitMessage = 'Unable to save the department. Check that the API and database are available.';
        this.submitStatus = 'error';
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.departmentForm.reset();
    this.t.clear();
  }

  onClear(): void {
    this.submitted = false;
    this.t.clear();
  }
}
