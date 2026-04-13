import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentComponent } from '../department/department.component';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [SharedModule, DepartmentsRoutingModule]
})
export class DepartmentsModule { }
