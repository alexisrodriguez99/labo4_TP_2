import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/componentes/services/firestore.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosClinica } from 'src/app/clases/usuariosClinica';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.scss']
})
export class AltaPacienteComponent implements OnInit {

  public grupoDeControles!:FormGroup
  paisSeleccionado:string="";
    listadoPaises:any;
    foto:any
    foto2:any
    usuario:UsuariosClinica={id:'',perfil:"paciente",nombre:'',apellido:'', edad:0,dni:0, mail:'',contrasenia:'',permiso:true,img1:'',img2:'',obraSocial:''};
  constructor(private fb:FormBuilder,private afs: AngularFirestore,private firestore:FirestoreService,private router:Router,private authSer:AuthService,private firestorage:AngularFireStorage) { }
 paisMostrar:any;

 ngOnInit(): void {

    


  this.grupoDeControles=this.fb.group({
    'nombre':['',[Validators.required,this.validadorDeEspacios]],
    'apellido':['',[Validators.required,this.validadorDeEspacios]],
    'edad':['',[Validators.required,Validators.min(18),Validators.max(100)]],

    //'codigo':['',[Validators.required,Validators.min(100),Validators.max(10000)]],
    'dni':['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      'obraSocial':['',[Validators.required]],
      'mail':['',[Validators.required,Validators.email]],
      'contrasenia':['',[Validators.required,this.validadorDeEspacios]],
      'img':[null,Validators.required],
      'img2':[null,Validators.required]

  });

}
async enviar(){
  console.info("formulario",this.grupoDeControles);
  let id:any;

  this.usuario.nombre = this.grupoDeControles.get('nombre')?.value;
  //alert(this.producto.descripcion)
  this.usuario.apellido = this.grupoDeControles.get('apellido')?.value;
  this.usuario.edad = this.grupoDeControles.get('edad')?.value;
  this.usuario.dni = this.grupoDeControles.get('dni')?.value;
  this.usuario.mail = this.grupoDeControles.get('mail')?.value;
  this.usuario.contrasenia = this.grupoDeControles.get('contrasenia')?.value;
   //this.repartidor.id=this.afs.createId();

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

      task2.snapshotChanges().toPromise().then(() => {
          fileRef2.getDownloadURL().toPromise().then(response2 => {

        // this.usuario.img1 = response;
          this.usuario.img2 = response2;


          this.usuario.id = id;
          console.log("chekeo el id_"+this.usuario.id);
          this.firestore.actualizar('usuariosClinica',this.usuario.id,this.usuario).then(()=>{
 // this.route.navigate(['bienvenido']);
});
        });
        })
        this.router.navigate(['/home']);

//console.log(us.user.uid);


});
})

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

  console.log("ahoasfdsafd");

  this.paisMostrar=pais;
this.grupoDeControles.get('pais')?.setValue(pais.name.common);
  console.log(this.paisMostrar);
  console.log("ahoasfdsafd");

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
