import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemeBreadComponent } from './scheme-bread/scheme-bread.component';
import { SchemeListComponent } from './scheme-list/scheme-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full"},
  { path: "list", component: SchemeListComponent },
  {
    path: 'activity/:action',
    component: SchemeBreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeRoutingModule { }
