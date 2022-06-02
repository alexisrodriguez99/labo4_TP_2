import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaEspecialistaComponent } from './componentes/alta-especialista/alta-especialista.component';
import { AltaPacienteComponent } from './componentes/alta-paciente/alta-paciente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { EspecialidadesComponent } from './listados/especialidades/especialidades.component';
import { ListaEspecialistaComponent } from './listados/lista-especialista/lista-especialista.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaEspecialistaComponent,
    AltaPacienteComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    EspecialidadesComponent,
    ListaEspecialistaComponent,
    AltaAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFirestoreModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
