import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosClinica } from 'src/app/clases/usuariosClinica';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Especialista } from 'src/app/clases/especialista';
import Swal from 'sweetalert2';
import { Admin } from 'src/app/clases/admin';
@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  public grupoDeControles!:FormGroup
  paisSeleccionado:string="";
    listadoPaises:any;
    listaEspecialidades:string[]=[];
    foto:any
    foto2:any
    usuario:Admin={id:'',perfil:"admin",nombre:'',apellido:'', edad:0,dni:0, mail:'',contrasenia:'',img1:''};
  constructor(private fb:FormBuilder,private afs: AngularFirestore,private firestore:FirestoreService,private router:Router,private authSer:AuthService,private firestorage:AngularFireStorage) { }
 paisMostrar:any;

 ngOnInit(): void {
  
    


  this.grupoDeControles=this.fb.group({
    'nombre':['',[Validators.required,this.validadorDeEspacios]],
    'apellido':['',[Validators.required,this.validadorDeEspacios]],
    'edad':['',[Validators.required,Validators.min(18),Validators.max(100)]],

    //'codigo':['',[Validators.required,Validators.min(100),Validators.max(10000)]],
    'dni':['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      //'especialidad':['',[Validators.required,this.validadorDeEspacios]],
      'mail':['',[Validators.required,Validators.email]],
      'contrasenia':['',[Validators.required,this.validadorDeEspacios]],
      'img':[null,Validators.required],
      

  });
// let especialidad=['hoa','sdf']
//  this.grupoDeControles.get('especialidad')?.setValue(especialidad);
}
async enviar(){ try{
  console.info("formulario",this.grupoDeControles);
  let id:any;

  this.usuario.nombre = this.grupoDeControles.get('nombre')?.value;
  //alert(this.producto.descripcion)
  this.usuario.apellido = this.grupoDeControles.get('apellido')?.value;
  this.usuario.edad = this.grupoDeControles.get('edad')?.value;
  this.usuario.dni = this.grupoDeControles.get('dni')?.value;
  this.usuario.contrasenia = this.grupoDeControles.get('contrasenia')?.value;
  this.usuario.mail = this.grupoDeControles.get('mail')?.value;
  //this.usuario.especialidad = this.grupoDeControles.get('especialidad')?.value;
   //this.repartidor.id=this.afs.createId();
   alert(this.usuario.mail)
    await this.authSer.register(this.usuario.mail, this.usuario.contrasenia).then(function (userCreds:any){
    console.log("el uid  "+userCreds.user.uid );
    
          id= userCreds.user.uid;
           
})
 
let pathRef = `fotos/`+this.usuario.mail+`/1`;
      const fileRef = this.firestorage.ref(pathRef);
      const task = this.firestorage.upload(pathRef, this.foto); 
task.snapshotChanges().toPromise().then(() => {
  fileRef.getDownloadURL().toPromise().then(response => {

    this.usuario.img1 = response;
    //this.usuario.id = this.afs.createId();
    let pathRef2 = `fotos/`+this.usuario.mail+`/2`;
    const fileRef2 = this.firestorage.ref(pathRef2);
    const task2 = this.firestorage.upload(pathRef2, this.foto2);

      
         this.usuario.id = id;
          console.log("chekeo el id_"+this.usuario.id);
          this.firestore.actualizar('usuariosClinica',this.usuario.id,this.usuario).then(()=>{
 // this.route.navigate(['bienvenido']);
                    });

//console.log(us.user.uid);


});
})
this.router.navigate(['/home']);
}
catch(error)
{
     alert("hola"+error)
}
}
private validadorDeEspacios(control: AbstractControl):null|object{
  let nombre:string=control.value;
  let espacios=nombre.includes(' ');
  if(espacios==true){
    return {
      validadorDeEspacios:true
    }
  }
  else{
    return null;
  }
  return null;
}
paisSelecc(pais:any){

  console.log(pais.nombre);
  this.listaEspecialidades.push(pais.nombre)
let especialidad=['hoa','sdf']
 // this.paisMostrar=pais;
this.grupoDeControles.get('especialidad')?.setValue(this.listaEspecialidades);
 // console.log(this.paisMostrar);
 
}
onSelecFoto(e:any, foto:string){
  if(e.target.files && e.target.files[0])
  {
    if(foto == 'foto1')
    {
      this.foto = e.target.files[0];
    }
    else
    {
      this.foto2 = e.target.files[0];
    }
  }
}
}
