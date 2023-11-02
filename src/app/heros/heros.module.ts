import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { CardComponent } from './components/card/card.component';
import { HerosRoutingModule } from './heros-routing.module';
import {
    FormPageComponent,
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
} from './pages';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { HerosService } from './services';

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
    HerosRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    HerosService
  ]
})
export class HerosModule { }
