import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMasterBreadComponent } from './products-master-bread.component';

describe('ProductsMasterBreadComponent', () => {
  let component: ProductsMasterBreadComponent;
  let fixture: ComponentFixture<ProductsMasterBreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsMasterBreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMasterBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
