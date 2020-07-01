import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormGroupDirective, FormArray, Validators} from '@angular/forms';
import { AcapService } from '../acap.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  departmentForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private acapservice: AcapService) { }

  ngOnInit(): void {
        this.departmentForm = this.formBuilder.group({
          departmentname:['', Validators.required],
          managername:['', Validators.required],
          numberOfManager: ['', Validators.required],
          manager: new FormArray([])
        });
      }

          // convenience getters for easy access to form fields
    get f() { return this.departmentForm.controls; }
    get t() { return this.f.manager as FormArray; }
    onChangeTickets(e) {
      const numberOfManager = e.target.value || 0;
      if (this.t.length < numberOfManager) {
          for (let i = this.t.length; i < numberOfManager; i++) {
              this.t.push(this.formBuilder.group({
                noofManager: ['', Validators.required],
                developer: ['', Validators.required],
                tester: ['', [Validators.required]]
              }));
          }
      } else {
          for (let i = this.t.length; i >= numberOfManager; i--) {
              this.t.removeAt(i);
          }
      }
  }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.departmentForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.departmentForm.value, null, 4));
      this.acapservice.addPerson(this.departmentForm.value)
  }

    onReset() {
      // reset whole form back to initial state
      this.submitted = false;
      this.departmentForm.reset();
      this.t.clear();
  }

  onClear() {
      // clear errors and reset ticket fields
      this.submitted = false;
      this.t.reset();
  }

}
