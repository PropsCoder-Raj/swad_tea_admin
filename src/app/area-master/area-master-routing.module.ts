import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaMasterBreadComponent } from './area-master-bread/area-master-bread.component';
import { AreaMasterListComponent } from './area-master-list/area-master-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: AreaMasterListComponent },
  {
    path: 'activity/:action',
    component: AreaMasterBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaMasterRoutingModule { }
