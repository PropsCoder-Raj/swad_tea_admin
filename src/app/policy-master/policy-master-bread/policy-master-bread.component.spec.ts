import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyMasterBreadComponent } from './policy-master-bread.component';

describe('PolicyMasterBreadComponent', () => {
  let component: PolicyMasterBreadComponent;
  let fixture: ComponentFixture<PolicyMasterBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyMasterBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyMasterBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
