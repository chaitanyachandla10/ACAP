import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcapService, ManagerAllocation } from '../acap.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerComponent implements OnInit {
  managers$: Observable<ManagerAllocation[]> = new Observable();

  constructor(private acapService: AcapService) { }

  ngOnInit(): void {
    this.managers$ = this.acapService.getManagers();
  }

  getAllocationTotal(allocation: ManagerAllocation): number {
    return (allocation.developer * 1000) + (allocation.tester * 500) + (allocation.noofManager * 300);
  }
}
