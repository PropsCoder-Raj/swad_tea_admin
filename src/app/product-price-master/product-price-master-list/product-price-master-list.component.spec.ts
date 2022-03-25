import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceMasterListComponent } from './product-price-master-list.component';

describe('ProductPriceMasterListComponent', () => {
  let component: ProductPriceMasterListComponent;
  let fixture: ComponentFixture<ProductPriceMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPriceMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
