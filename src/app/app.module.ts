import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { AppHeaderComponent } from './masters/app-header/app-header.component';
import { AppMenuComponent } from './masters/app-menu/app-menu.component';
import { AppFooterComponent } from './masters/app-footer/app-footer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ApiService } from './_helper/api/api.service';
import { AuthService } from './_helper/auth/auth.service';
import { UserService } from './_helper/user/user.service';
import { JwtInterceptorInterceptor } from './_helper/other/jwt-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from './_helper/other/error-interceptor.interceptor';
import { ExcelService } from './_helper/excel/excel.service';
import { ProfileComponent } from './profile/profile.component';
import { AllocationComponent } from './allocation/allocation.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    DashboardComponent,
    AppFooterComponent,
    AppMenuComponent,
    LoginComponent,
    ProfileComponent,
    AllocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 4,
      innerStrokeWidth: 0,
      responsive:true,
      outerStrokeColor: "#049dff",
      animationDuration: 300,
      showBackground:true,
      backgroundPadding:-4,
      showSubtitle:false,
      backgroundColor:'#34495E',
      titleColor:'#ffffff',
      titleFontSize:'10',
      unitsColor:'#ffffff'
    }),
    NgbProgressbarModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService, ApiService, UserService, ExcelService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
