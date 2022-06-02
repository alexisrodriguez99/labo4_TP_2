import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { EspecialidadesComponent } from './listados/especialidades/especialidades.component';
import { ListaEspecialistaComponent } from './listados/lista-especialista/lista-especialista.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},

  { path: 'alta', loadChildren: () => import('./componentes/alta/alta.module').then(m => m.AltaModule) },
{path:"login", component:LoginComponent},
{path:"home", component:HomeComponent},
{path:"especialidades", component:EspecialidadesComponent},
{path:"listaEspecialista", component:ListaEspecialistaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
