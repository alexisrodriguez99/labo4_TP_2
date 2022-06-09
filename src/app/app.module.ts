import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaEspecialistaComponent } from './componentes/alta-especialista/alta-especialista.component';
// import { AltaPacienteComponent } from './componentes/alta-paciente/alta-paciente.component';

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
//import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
//import { TurnosEspecialistaComponent } from './componentes/turnos/turnos-especialista/turnos-especialista.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './componentes/turnos/solicitar-turno/solicitar-turno.component';
import { TurnoEspecialidadComponent } from './componentes/turnos/turno-especialidad/turno-especialidad.component';
import { TurnoEspecialistaComponent } from './componentes/turnos/turno-especialista/turno-especialista.component';
import { TurnoFechaComponent } from './componentes/turnos/turno-fecha/turno-fecha.component';
import { TurnoPacienteComponent } from './componentes/turnos/turno-paciente/turno-paciente.component';
import { TurnoHoraComponent } from './componentes/turnos/turno-hora/turno-hora.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { ListaTurnosPacienteComponent } from './listados/lista-turnos-paciente/lista-turnos-paciente.component';
import { ListaTurnosEspecialistaComponent } from './listados/lista-turnos-especialista/lista-turnos-especialista.component';
import { VerReseniaComponent } from './listados/ver-resenia/ver-resenia.component';
import { FechaProgramadaPipe } from './pipes/fecha-programada.pipe';
import { NombreUsuarioPipe } from './pipes/nombre-usuario.pipe';
import { FormatoFechaPipe } from './pipes/formato-fecha.pipe';
import { AltaModule } from './componentes/alta/alta.module';
import { ListaTurnosAdminComponent } from './listados/lista-turnos-admin/lista-turnos-admin.component';
import { AdminTurnosComponent } from './componentes/turnos/admin-turnos/admin-turnos.component';
import { OrdenarPorDiaPipe } from './pipes/ordenar-por-dia.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AltaEspecialistaComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    EspecialidadesComponent,
    ListaEspecialistaComponent,
    AltaAdminComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,
    TurnoEspecialidadComponent,
    TurnoEspecialistaComponent,
    TurnoFechaComponent,
    TurnoPacienteComponent,
    TurnoHoraComponent,
    MisTurnosComponent,
    ListaTurnosPacienteComponent,
    ListaTurnosEspecialistaComponent,
    VerReseniaComponent,
    FechaProgramadaPipe,
    NombreUsuarioPipe,
    FormatoFechaPipe,
    ListaTurnosAdminComponent,
    AdminTurnosComponent,
    OrdenarPorDiaPipe,
  ],
  imports: [     
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFirestoreModule,
     ReactiveFormsModule,
     AltaModule
     //NgxSpinnerModule,
     

  ],
 // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
