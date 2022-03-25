import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersMastersBreadComponent } from './retailers-masters-bread.component';

describe('RetailersMastersBreadComponent', () => {
  let component: RetailersMastersBreadComponent;
  let fixture: ComponentFixture<RetailersMastersBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailersMastersBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersMastersBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
