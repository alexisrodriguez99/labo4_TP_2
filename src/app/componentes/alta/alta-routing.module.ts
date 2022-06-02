import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadesComponent } from 'src/app/listados/especialidades/especialidades.component';
import { AltaAdminComponent } from '../alta-admin/alta-admin.component';
import { AltaEspecialistaComponent } from '../alta-especialista/alta-especialista.component';
import { AltaPacienteComponent } from '../alta-paciente/alta-paciente.component';
import { AltaComponent } from './alta.component';

const routes: Routes = [{ path: '', component: AltaComponent, children:[
{path:"altaPaciente", component:AltaPacienteComponent},
{path:"altaEspecialista", component:AltaEspecialistaComponent},
{path:"esp", component:EspecialidadesComponent},
{path:"admin", component:AltaAdminComponent},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaRoutingModule { }
