import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagerComponent } from './manager.component';
import { AcapService } from '../acap.service';
import { of } from 'rxjs';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerComponent],
      providers: [{ provide: AcapService, useValue: { getManagers: () => of([]) } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
