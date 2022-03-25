import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyMasterListComponent } from './policy-master-list.component';

describe('PolicyMasterListComponent', () => {
  let component: PolicyMasterListComponent;
  let fixture: ComponentFixture<PolicyMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
