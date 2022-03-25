import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationBreadComponent } from './designation-bread/designation-bread.component';
import { DesignationListComponent } from './designation-list/designation-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: DesignationListComponent },
  {
    path: 'activity/:action',
    component: DesignationBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
