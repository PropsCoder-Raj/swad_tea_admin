import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMasterListComponent } from './products-master-list.component';

describe('ProductsMasterListComponent', () => {
  let component: ProductsMasterListComponent;
  let fixture: ComponentFixture<ProductsMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
