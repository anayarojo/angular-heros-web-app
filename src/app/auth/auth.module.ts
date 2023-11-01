import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';
import { AuthRoutingModule } from './auth-routing.module';
import {
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
} from './pages';

@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
