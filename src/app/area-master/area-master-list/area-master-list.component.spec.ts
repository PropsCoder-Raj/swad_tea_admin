import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMasterListComponent } from './area-master-list.component';

describe('AreaMasterListComponent', () => {
  let component: AreaMasterListComponent;
  let fixture: ComponentFixture<AreaMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
