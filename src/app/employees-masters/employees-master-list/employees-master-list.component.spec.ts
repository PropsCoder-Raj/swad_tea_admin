import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesMasterListComponent } from './employees-master-list.component';

describe('EmployeesMasterListComponent', () => {
  let component: EmployeesMasterListComponent;
  let fixture: ComponentFixture<EmployeesMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
