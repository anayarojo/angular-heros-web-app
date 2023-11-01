import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutPageComponent } from '../shared';
import { HerosRoutingModule } from './heros-routing.module';
import {
    HerosPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
} from './pages';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HerosPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    HerosRoutingModule
  ]
})
export class HerosModule { }
