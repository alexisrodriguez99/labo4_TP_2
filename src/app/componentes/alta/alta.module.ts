import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltaRoutingModule } from './alta-routing.module';
import { AltaComponent } from './alta.component';


@NgModule({
  declarations: [
    AltaComponent
  ],
  imports: [
    CommonModule,
    AltaRoutingModule
  ]
})
export class AltaModule { }
