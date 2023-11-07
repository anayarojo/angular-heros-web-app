import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    HerosService,
    LocalHerosService,
} from '@heros/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    AuthService,
    LocalAuthService,
} from './auth';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: AuthService,
      useClass: LocalAuthService
    },
    {
      provide: HerosService,
      useClass: LocalHerosService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
