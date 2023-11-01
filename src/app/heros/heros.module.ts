import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';
import { HerosRoutingModule } from './heros-routing.module';
import {
    FormPageComponent,
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
} from './pages';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    FormPageComponent,
    HeroPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HerosRoutingModule
  ]
})
export class HerosModule { }
