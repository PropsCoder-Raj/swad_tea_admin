import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { DesignationBreadComponent } from './designation-bread/designation-bread.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DesignationListComponent,
    DesignationBreadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DesignationRoutingModule
  ]
})
export class DesignationModule { }
