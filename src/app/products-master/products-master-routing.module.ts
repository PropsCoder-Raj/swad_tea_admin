import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsMasterBreadComponent } from './products-master-bread/products-master-bread.component';
import { ProductsMasterListComponent } from './products-master-list/products-master-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: ProductsMasterListComponent },
  {
    path: 'activity/:action',
    component: ProductsMasterBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsMasterRoutingModule { }
