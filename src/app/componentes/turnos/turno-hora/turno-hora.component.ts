import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-turno-hora',
  templateUrl: './turno-hora.component.html',
  styleUrls: ['./turno-hora.component.scss']
})
export class TurnoHoraComponent implements OnInit {

  @Input() especialista:any;
  @Input() dia:any;

  @Output() seleccionarHorario:EventEmitter<any> = new EventEmitter<any>();

  horasAMostrar:any;
  turnosExistentes:any;

  horariosMostrar:any[] = [];
  horarioFiltro:any[] = [];
  constructor(private firestore:FirestoreService) { }

  ngOnInit(): void {
    console.log(this.especialista)
    this.firestore.obtenerTodos('turno').subscribe((usuariosSnapshot) => {
      this.horariosMostrar = [];
      this.horarioFiltro=[]
      usuariosSnapshot.forEach((usuarioData: any) => {
    //    console.log(usuarioData.payload.doc.data())
        let data = usuarioData.payload.doc.data();
        //console.log(data)
        if(data.idEspecialista == this.especialista.id)
        {
          this.horariosMostrar.push(data);
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
      console.log(this.horariosMostrar)
      this.horariosMostrar.forEach(element => {
        if(element.fechaCreacion==this.dia.fechaCreacion && element.idEspecialista==this.especialista.id){
            this.horarioFiltro.push(element);

           }
          //  else{
          //   let repetido=true
          //   let repite=2
          //   this.diasFiltro.forEach(elementFiltro => {
              
          //     if(elementFiltro.fechaCreacion==element.fechaCreacion){
          //       repetido=false;
          //       repite++;
          //     }
          //   });
          //   if(repite==2){
          //     this.diasFiltro.push(element);
          //   }
          //  }
          
         
      });console.log(this.horarioFiltro)
      this.horarioFiltro=this.ordenarPorBurbuja(this.horarioFiltro)
      console.log(this.horarioFiltro)
    });
  }
  elegirHorario(hora:any)
  {
    this.seleccionarHorario.emit(hora);
  }
  ordenarPorBurbuja(arrayDesordenado: any[]): any {
    // Copia el array recibido
    let tempArray: any[] = arrayDesordenado;
    let volverAOrdenar: boolean = false
   // console.log(tempArray[1+1].puntos);
    // Recorre el array
    tempArray.forEach(function (valor, key) {
  
      if(tempArray[key + 1]){
  
        // Comprueba si el primero es mayor que el segundo y no esta en la última posición
        if (tempArray[key].hora > tempArray[key + 1].hora && tempArray.length - 1 != key) {
            // Intercambia la primera posición por la segunda
            let primerNum = tempArray[key]
            let segundoNum = tempArray[key + 1]
            tempArray[key] = segundoNum
            tempArray[key + 1] = primerNum
            // Si debe volver a ordenarlo
            volverAOrdenar = true
        }
      }
    })
    if (volverAOrdenar) {
      this.ordenarPorBurbuja(tempArray)
  }
  // Array ordenado
  return tempArray
  }
}
