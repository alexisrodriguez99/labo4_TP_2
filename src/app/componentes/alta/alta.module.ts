import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltaRoutingModule } from './alta-routing.module';
import { AltaComponent } from './alta.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { AltaPacienteComponent } from '../alta-paciente/alta-paciente.component';


@NgModule({
  declarations: [
    AltaComponent,
    AltaPacienteComponent
  ],
  imports: [
    CommonModule,
    AltaRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AltaModule { }
