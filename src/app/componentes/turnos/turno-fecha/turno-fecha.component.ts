import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-turno-fecha',
  templateUrl: './turno-fecha.component.html',
  styleUrls: ['./turno-fecha.component.scss']
})
export class TurnoFechaComponent implements OnInit {
  @Input() especialista:any;
  @Output() seleccionarDia:EventEmitter<any> = new EventEmitter<any>();
  diasLaborables:any = [];
  diasAMostrar:any[] = [];
  diasFiltro:any[] = [];
  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    console.log(this.especialista)
    this.firestore.obtenerTodos('turno').subscribe((usuariosSnapshot) => {
      this.diasAMostrar = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
    //    console.log(usuarioData.payload.doc.data())
        let data = usuarioData.payload.doc.data();
       // console.log(data)
        if(data.idEspecialista == this.especialista.id)
        {
          this.diasAMostrar.push(data);
          // this.diasAMostrar.push({
          //   dni:data.dni,
          //   apellido:data.apellido,
          //   aprobado:data.aprobado,
          //   contrasenia:data.contrasenia,
          //   edad:data.edad,
          //   especialidad:data.especialidad,
          //   img1:data.img1,
          //   id:data.id,
          //   mail:data.mail,
          //   nombre:data.nombre,
          //   perfil:data.perfil,
          //   verificado:data.verificado,
          //   horario:data.horario,
          //   diasLaborables:data.diasLaborables});
        }
      });
      //console.log(this.diasAMostrar)
      this.diasAMostrar.forEach(element => {
        if(this.diasFiltro.length==0){
            this.diasFiltro.push(element);

           }
           else{
            let repetido=true
            let repite=2
            this.diasFiltro.forEach(elementFiltro => {
              
              if(elementFiltro.fechaCreacion==element.fechaCreacion){
                repetido=false;
                repite++;
              }
            });
            if(repite==2){
              this.diasFiltro.push(element);
            }
           }
          
         
      });//console.log(this.diasFiltro)
    });
  }
  elegirDia(dias:any)
  {
    this.seleccionarDia.emit(dias);
  }
}
