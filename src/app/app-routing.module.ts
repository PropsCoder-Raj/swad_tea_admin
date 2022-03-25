import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationComponent } from './allocation/allocation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_helper/auth/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "employees-masters", loadChildren: () => import('./employees-masters/employees-masters.module').then(m => m.EmployeesMastersModule), canActivate: [AuthGuard] },
  { path: "retailers-masters", loadChildren: () => import('./retailers-masters/retailers-masters.module').then(m => m.RetailersMastersModule), canActivate: [AuthGuard] },
  { path: "products-master", loadChildren: () => import('./products-master/products-master.module').then(m => m.ProductsMasterModule), canActivate: [AuthGuard] },
  { path: "product-price-master", loadChildren: () => import('./product-price-master/product-price-master.module').then(m => m.ProductPriceMasterModule), canActivate: [AuthGuard] },
  { path: "policy-master", loadChildren: () => import('./policy-master/policy-master.module').then(m => m.PolicyMasterModule), canActivate: [AuthGuard] },
  { path: "area-master", loadChildren: () => import('./area-master/area-master.module').then(m => m.AreaMasterModule), canActivate: [AuthGuard] },
  { path: "designation", loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule), canActivate: [AuthGuard] },
  { path: "scheme", loadChildren: () => import('./scheme/scheme.module').then(m => m.SchemeModule), canActivate: [AuthGuard] },
  { path: "orders", loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
  { path: "incentive", loadChildren: () => import('./incentive/incentive.module').then(m => m.IncentiveModule), canActivate: [AuthGuard] },
  { path: "transport-master", loadChildren: () => import('./transport-master/transport-master.module').then(m => m.TransportMasterModule), canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent },
  { path: "allocation", component: AllocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
