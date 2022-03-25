import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMasterBreadComponent } from './area-master-bread.component';

describe('AreaMasterBreadComponent', () => {
  let component: AreaMasterBreadComponent;
  let fixture: ComponentFixture<AreaMasterBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaMasterBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMasterBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
