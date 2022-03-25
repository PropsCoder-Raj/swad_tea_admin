import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailersMastersBreadComponent } from './retailers-masters-bread/retailers-masters-bread.component';
import { RetailersMastersListComponent } from './retailers-masters-list/retailers-masters-list.component';

const routes: Routes = [
  
  { path: "list", redirectTo: "", pathMatch: "full"},
  { path: "", component: RetailersMastersListComponent },
  {
    path: ':action',
    component: RetailersMastersBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailersMastersRoutingModule { }
