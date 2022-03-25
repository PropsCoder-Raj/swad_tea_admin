import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  { path: "", redirectTo: "orders", pathMatch: "full"},
  { path: "orders", component: OrdersListComponent},
  { path: "invoice/:id", component: InvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
