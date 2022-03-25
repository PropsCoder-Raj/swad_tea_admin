import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasportMasterBreadComponent } from './trasport-master-bread.component';

describe('TrasportMasterBreadComponent', () => {
  let component: TrasportMasterBreadComponent;
  let fixture: ComponentFixture<TrasportMasterBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasportMasterBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasportMasterBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
