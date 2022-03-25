import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesMasterBraedComponent } from './employees-master-braed.component';

describe('EmployeesMasterBraedComponent', () => {
  let component: EmployeesMasterBraedComponent;
  let fixture: ComponentFixture<EmployeesMasterBraedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesMasterBraedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesMasterBraedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
