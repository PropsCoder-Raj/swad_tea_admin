import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyMasterRoutingModule } from './policy-master-routing.module';
import { PolicyMasterListComponent } from './policy-master-list/policy-master-list.component';
import { PolicyMasterBreadComponent } from './policy-master-bread/policy-master-bread.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PolicyMasterListComponent,
    PolicyMasterBreadComponent
  ],
  imports: [
    CommonModule,
    PolicyMasterRoutingModule,
    FormsModule
  ]
})
export class PolicyMasterModule { }
