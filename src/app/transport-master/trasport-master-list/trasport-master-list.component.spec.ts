import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasportMasterListComponent } from './trasport-master-list.component';

describe('TrasportMasterListComponent', () => {
  let component: TrasportMasterListComponent;
  let fixture: ComponentFixture<TrasportMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasportMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasportMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
