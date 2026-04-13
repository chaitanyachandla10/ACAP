import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ManagersRoutingModule } from './managers-routing.module';
import { ManagerComponent } from '../manager/manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [SharedModule, ManagersRoutingModule]
})
export class ManagersModule { }
