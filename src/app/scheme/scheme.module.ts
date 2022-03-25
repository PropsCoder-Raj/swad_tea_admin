import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeRoutingModule } from './scheme-routing.module';
import { SchemeListComponent } from './scheme-list/scheme-list.component';
import { SchemeBreadComponent } from './scheme-bread/scheme-bread.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SchemeListComponent,
    SchemeBreadComponent
  ],
  imports: [
    CommonModule,
    SchemeRoutingModule,
    FormsModule
  ]
})
export class SchemeModule { }
