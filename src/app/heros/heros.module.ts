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
import { HerosService } from './services';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    FormPageComponent,
    HeroPageComponent,
    CardComponent,
    HeroImagePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HerosRoutingModule
  ],
  providers: [
    HerosService
  ]
})
export class HerosModule { }
