import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    Error404PageComponent,
    LayoutPageComponent,
} from './pages';

@NgModule({
  declarations: [
    LayoutPageComponent,
    Error404PageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error404PageComponent
  ]
})
export class SharedModule { }
