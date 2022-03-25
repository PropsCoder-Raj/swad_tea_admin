import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncentiveRoutingModule } from './incentive-routing.module';
import { IncentiveListComponent } from './incentive-list/incentive-list.component';


@NgModule({
  declarations: [
    IncentiveListComponent
  ],
  imports: [
    CommonModule,
    IncentiveRoutingModule
  ]
})
export class IncentiveModule { }
