import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersMastersListComponent } from './retailers-masters-list.component';

describe('RetailersMastersListComponent', () => {
  let component: RetailersMastersListComponent;
  let fixture: ComponentFixture<RetailersMastersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailersMastersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersMastersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
