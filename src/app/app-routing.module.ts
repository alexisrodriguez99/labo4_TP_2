import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { AdminTurnosComponent } from './componentes/turnos/admin-turnos/admin-turnos.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './componentes/turnos/solicitar-turno/solicitar-turno.component';
import { EspecialidadesComponent } from './listados/especialidades/especialidades.component';
import { ListaEspecialistaComponent } from './listados/lista-especialista/lista-especialista.component';
import { PacientesComponent } from './listados/pacientes/pacientes.component';

const routes: Routes = [
  

  { path: 'alta', loadChildren: () => import('./componentes/alta/alta.module').then(m => m.AltaModule),data: { animation: 'auth'} },
{path:"login", component:LoginComponent,data: { animation: 'login'}},
{path:"home", component:HomeComponent,data: { animation: 'home'}},
{path:"especialidades", component:EspecialidadesComponent,data: { animation: 'especialidades'}},
{path:"listaEspecialista", component:ListaEspecialistaComponent,data: { animation: 'listaEspecialista'}},
{path:"miPerfil", component:MiPerfilComponent,data: { animation: 'miPerfil'}},
{path:"solicitarTurno", component:SolicitarTurnoComponent,data: { animation: 'solicitarTurno'}},
{path:"misTurnos", component:MisTurnosComponent,data: { animation: 'misTurnos'}},
{path:"turnos", component:AdminTurnosComponent,data: { animation: 'turnos'}},
{path:"pacientes", component:PacientesComponent,data: { animation: 'pacientes'}},
{path:"reportes", component:ReportesComponent,data: { animation: 'repoertes'}},

{path:"", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
