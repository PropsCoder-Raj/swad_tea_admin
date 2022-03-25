import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyMasterBreadComponent } from './policy-master-bread/policy-master-bread.component';
import { PolicyMasterListComponent } from './policy-master-list/policy-master-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: PolicyMasterListComponent },
  {
    path: 'activity/:action',
    component: PolicyMasterBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyMasterRoutingModule { }
