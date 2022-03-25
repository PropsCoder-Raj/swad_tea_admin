import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPriceMasterBreadComponent } from './product-price-master-bread/product-price-master-bread.component';
import { ProductPriceMasterListComponent } from './product-price-master-list/product-price-master-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: ProductPriceMasterListComponent },
  {
    path: 'activity/:action',
    component: ProductPriceMasterBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPriceMasterRoutingModule { }
