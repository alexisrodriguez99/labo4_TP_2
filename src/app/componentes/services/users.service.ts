import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public listadoEspecialistas:any[] = [];
  public listadoPacientes:any[] = [];
  public listadoAdministradores:any[] = [];
  public listadoUsuarios:any[]=[];

  constructor(private firestore:FirestoreService) {

    this.firestore.obtenerTodos('usuariosClinica').subscribe((usuariosSnapshot) => {

      this.listadoPacientes = [];
      this.listadoAdministradores = [];
      this.listadoEspecialistas = [];
      this.listadoUsuarios = [];
       usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        //console.log(data)
        if(data.perfil == 'especialista')
        {
          this.listadoEspecialistas.push(data);

          // this.listadoEspecialistas.push({
          //   id:data.id,
          //   dni:data.dni,
          //   nombre:data.nombre,
          //   apellido:data.apellido,
          //   aprobado:data.aprobado,
          //   edad:data.edad,
          //   especialidad:data.especialidad,
          //   foto:data.foto,
          //   mail:data.mail,
          //   perfil:data.perfil,
          //   verificado:data.verificado,
          //   horario:data.horario,
          //   diasLaborables:data.diasLaborables});
        }
        if(data.perfil == 'paciente')
        {
          this.listadoPacientes.push(data);

          // this.listadoPacientes.push({
          //   id:data.id,
          //   dni:data.dni,
          //   nombre:data.nombre,
          //   apellido:data.apellido,
          //   edad:data.edad,
          //   perfil:data.perfil,
          //   foto:data.foto,
          //   foto2:data.foto2,
          //   obraSocial:data.obraSocial,
          //   mail:data.mail});
        }
        if(data.perfil == 'administrador')
        {
          this.listadoAdministradores.push(data);

          // this.listadoAdministradores.push({
          //   id:data.id,
          //   DNI:data.DNI,
          //   nombre:data.nombre,
          //   apellido:data.apellido,
          //   edad:data.edad,
          //   perfil:data.perfil});
        }

        this.listadoUsuarios.push({
          nombre:data.nombre,
          id:data.id,
          apellido:data.apellido,
        })
      });//console.log(this.listadoEspecialistas); console.log(this.listadoPacientes)
    });
   }
}
