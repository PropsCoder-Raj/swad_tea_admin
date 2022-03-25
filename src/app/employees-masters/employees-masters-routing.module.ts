import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesMasterBraedComponent } from './employees-master-braed/employees-master-braed.component';
import { EmployeesMasterListComponent } from './employees-master-list/employees-master-list.component';

const routes: Routes = [
  { path: "", component: EmployeesMasterListComponent },
  { path: "list", redirectTo: "", pathMatch: "full"},
  
  {
    path: ':action',
    component: EmployeesMasterBraedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesMastersRoutingModule { }
