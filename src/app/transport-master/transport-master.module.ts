import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportMasterRoutingModule } from './transport-master-routing.module';
import { TrasportMasterListComponent } from './trasport-master-list/trasport-master-list.component';
import { TrasportMasterBreadComponent } from './trasport-master-bread/trasport-master-bread.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrasportMasterListComponent,
    TrasportMasterBreadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransportMasterRoutingModule
  ]
})
export class TransportMasterModule { }
