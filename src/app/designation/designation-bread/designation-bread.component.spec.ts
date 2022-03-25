import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationBreadComponent } from './designation-bread.component';

describe('DesignationBreadComponent', () => {
  let component: DesignationBreadComponent;
  let fixture: ComponentFixture<DesignationBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
