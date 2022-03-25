import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrasportMasterBreadComponent } from './trasport-master-bread/trasport-master-bread.component';
import { TrasportMasterListComponent } from './trasport-master-list/trasport-master-list.component';

const routes: Routes = [
  
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: TrasportMasterListComponent },
  {
    path: 'activity/:action',
    component: TrasportMasterBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportMasterRoutingModule { }
