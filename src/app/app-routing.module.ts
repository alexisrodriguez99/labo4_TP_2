import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { AdminTurnosComponent } from './componentes/turnos/admin-turnos/admin-turnos.component';
import { MisTurnosComponent } from './componentes/turnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './componentes/turnos/solicitar-turno/solicitar-turno.component';
import { EspecialidadesComponent } from './listados/especialidades/especialidades.component';
import { ListaEspecialistaComponent } from './listados/lista-especialista/lista-especialista.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},

  { path: 'alta', loadChildren: () => import('./componentes/alta/alta.module').then(m => m.AltaModule) },
{path:"login", component:LoginComponent},
{path:"home", component:HomeComponent},
{path:"especialidades", component:EspecialidadesComponent},
{path:"listaEspecialista", component:ListaEspecialistaComponent},
{path:"miPerfil", component:MiPerfilComponent},
{path:"solicitarTurno", component:SolicitarTurnoComponent},
{path:"misTurnos", component:MisTurnosComponent},
{path:"turnos", component:AdminTurnosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
