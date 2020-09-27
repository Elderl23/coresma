import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";

import { StoreModule } from '@ngrx/store';
import { spinnersReducer } from './_redux/spinner/reducer'

import { HeadersInterceptor, SuccessInterceptor, ErrorInterceptor } from './_helpers';
import { AuthGuard } from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
            position: "right",
            distance: 12
        },
        vertical: {
            position: "top",
            distance: 12,
            gap: 10
        }
    },
      // Custom options in here
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({spinner:spinnersReducer})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
