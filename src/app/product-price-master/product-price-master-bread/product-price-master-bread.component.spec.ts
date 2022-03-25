import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceMasterBreadComponent } from './product-price-master-bread.component';

describe('ProductPriceMasterBreadComponent', () => {
  let component: ProductPriceMasterBreadComponent;
  let fixture: ComponentFixture<ProductPriceMasterBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPriceMasterBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceMasterBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
