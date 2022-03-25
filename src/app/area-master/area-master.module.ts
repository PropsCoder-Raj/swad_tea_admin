import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaMasterRoutingModule } from './area-master-routing.module';
import { AreaMasterListComponent } from './area-master-list/area-master-list.component';
import { AreaMasterBreadComponent } from './area-master-bread/area-master-bread.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AreaMasterListComponent,
    AreaMasterBreadComponent
  ],
  imports: [
    CommonModule,
    AreaMasterRoutingModule,
    FormsModule
  ]
})
export class AreaMasterModule { }
