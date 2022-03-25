import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeBreadComponent } from './scheme-bread.component';

describe('SchemeBreadComponent', () => {
  let component: SchemeBreadComponent;
  let fixture: ComponentFixture<SchemeBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
