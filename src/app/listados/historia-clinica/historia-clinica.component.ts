import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/clases/historiaClinica';
import { AuthService } from 'src/app/componentes/services/auth.service';
import { HistoriaMedicaService } from 'src/app/componentes/services/historia-medica.service';
import { PdfService } from 'src/app/componentes/services/pdf.service';
import { UsersService } from 'src/app/componentes/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  verHistClinica:boolean=true;
  historiasClinicas:HistoriaClinica[] = [];
  historiasFiltradas:HistoriaClinica[]=[];
  listadoEspecialistas:any[] = [];
  stringFiltro:string='';
  fechaActual:any
  constructor(private Users:UsersService, private historiaClinica:HistoriaMedicaService, public authSvc:AuthService,private pdf:PdfService) { }

  ngOnInit(): void {
    let fecha = new Date();
    this.fechaActual=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
    this.listadoEspecialistas = this.Users.listadoEspecialistas;
    this.historiaClinica.traerTodosByPaciente(this.authSvc.usuarioIngresado.id).subscribe(historiasClinicas => {
      this.historiasClinicas = historiasClinicas;
      this.historiasFiltradas = this.historiasClinicas.slice();
      console.log(historiasClinicas)
    })
  }

  verDetalles(historiaClinica:any)
  {
    let html = `Altura: ${historiaClinica.altura}<br>
    Peso: ${historiaClinica.peso}<br>
    temperatura: ${historiaClinica.temperatura}<br>
    presion: ${historiaClinica.presion}<br>`;

    historiaClinica.otros.forEach((element:any) => {
      console.log(element);
      html+=`${element.clave}: ${element.valor}<br>`
    });

    Swal.fire({
      title:'Historia Clinica:',
      html:html,
    });
  }

  filtrar()
  {
    if(this.stringFiltro != '')
    {
      
      console.log('entra aca');
      this.historiasFiltradas = this.historiasClinicas.slice();
console.log(this.historiasFiltradas)

      let indiceEliminar:number[]=[];
      this.historiasFiltradas.forEach((element, index) => {
console.log(element)
        // Filtro por especialistas
        let especialista=false;
        for(let i = 0;i < this.listadoEspecialistas.length; i++)
        {
          console.log(element.idEspecialista+' ; '+this.listadoEspecialistas[i].id)

          console.log(this.listadoEspecialistas[i].nombre+' ; '+this.listadoEspecialistas[i].apellido )
          console.log(this.stringFiltro )
          if(element.idEspecialista == this.listadoEspecialistas[i].id && (this.listadoEspecialistas[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoEspecialistas[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
          {
             especialista = true;
            break;
          }
        }

        if(!especialista)
        {
          indiceEliminar.push(index);
        }
      });

      let cont=0;
      indiceEliminar.forEach(element => {
        this.historiasFiltradas.splice((element-cont),1);
        cont++;
      });
    }
  }
  limpiarFiltro()
  {
    this.historiasFiltradas = this.historiasClinicas.slice();
  }
  async descargarPDF()
  {
    this.verHistClinica=false
     this.pdf.descargarPdf('historialMedico_'+ this.authSvc.usuarioIngresado.apellido +'.pdf', 'divPDF');
    this.verHistClinica=true;
    // let tabla = this.armarTablaHistoria();
    // let docDefinition:any = {
    //   header: {
    //     margin:10,
    //     columns: [
    //       {
    //         image: await this.getBase64ImageFromURL('../../../assets/clinica.png'),
    //         width:50,
    //         height:50,
    //         alignment: 'left'
    //       },
    //       {
    //         text:'Clinica OnLine',
    //         alignment:'center',
    //       },
    //       {
    //         text:'Historia clinica de '+this.authSvc.usuarioIngresado.nombre+' - Fecha de emisión: '+new Date().toDateString(),
    //         alignment:'right'
    //       }
    //     ]
    //   },
    //   content:[
    //     {
    //       margin:30,
    //       layout: 'lightHorizontalLines',
    //       table:{
    //         headerRows: 1,
    //         widths:[ 'auto', 'auto', 'auto', 'auto', 'auto','auto','auto'],
    //         body:tabla,
    //       },
    //     }
    //   ],

    //   images: {
    //     mySuperImage: 'data:image/png;base64,...content...'
    //   }
    // }

    // pdfMake.createPdf(docDefinition).open();
  }

  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx:any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  armarTablaHistoria()
  {
    let retorno:any[] = [];
    retorno.push(['Especialista', 'Especialidad', 'Fecha', 'Altura', 'Peso', 'Temperatura', 'Presion']);

    let cadaColumna:any[] = [];
    this.historiasClinicas.forEach(element => {
      // Obtengo el nombre del especialista y la especialidad
      this.listadoEspecialistas.forEach(especialista => {
        if(element.idEspecialista == especialista.id)
        {
          cadaColumna.push(especialista.apellido);
          cadaColumna.push(especialista.especialidad[0]);
        }
      });

      let fecha = new Date(element.fecha);
      cadaColumna.push(fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()),
      cadaColumna.push(element.altura);
      cadaColumna.push(element.peso);
      cadaColumna.push(element.temepratura);
      cadaColumna.push(element.presion);

      retorno.push(cadaColumna);
      cadaColumna = [];
    });

    return retorno;
  }

}
