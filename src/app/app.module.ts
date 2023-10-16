import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerModule } from './components/customers/customers.module';
import { HttpTokenInterceptor } from './main/interceptor/http.interceptor';
import { StaffModule } from './components/staff/staff.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [AppComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule,
    CustomerModule,
    StaffModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
