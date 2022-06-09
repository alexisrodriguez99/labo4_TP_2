import { Injectable } from '@angular/core';
import { UsuariosClinica } from '../../clases/usuariosClinica';

 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
//import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
//import { off } from 'process';

import {map, switchMap, first, catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged:any=false;
  public usuarioIngresado:any="";

  constructor(private afAuth: AngularFireAuth,private afs:AngularFirestore, ){
    /*   this.user$ = this.afAuth.authState.pipe(
         switchMap((user)=>{
           if(user)
           {
             return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
           }
           return of(null);
         })
       );*/
       afAuth.authState.subscribe(user=>(this.isLogged=user));
     }

     handleError(error:any){
      return throwError(error.message || "Server error")
    }
   isAdmin(userUid:any){
      return this.afs.doc<UsuariosClinica>(`users/${userUid}`).valueChanges;
  
    }
    async logout(): Promise<void>{
      try{
        this.usuarioIngresado=""
        await this.afAuth.signOut();
      }
      catch(error)
      {
        console.log('Error->',error);
      }
    }
    async login(email: string, password: string) {
      try{
  const user= await this.afAuth.signInWithEmailAndPassword(email, password);
  
  //return await this.afAuth.signInWithEmailAndPassword(user.email,user.password);
  //this.updateUserData(user); 
  return user;   
   }
      catch(error:any)
      {
        console.log('Error->',error.code);
        return  this.erroresFirebase(error.code) ;
  
      }
    }
     
  /*private updateUserData(user:User)
  {
    const userRef:AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User={
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data,{merge:true});
  }*/
  async register(email: string, password: string)   {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      /*let result;
       await this.afAuth.createUserWithEmailAndPassword(email, password).then(function (userCreds){
          result=userCreds.user?.uid;
          console.log("el uid  "+result );
      })*/ 
     // await this.sendVerifcationEmail();
     this.verificarEmail(); 
     await this.afAuth.signOut();
      return result;
    } catch (error:any) {
      console.log('Error->', error.code);
      return this.erroresFirebase(error.code) ;
    }
  }
   isAuth(){
     return this.afAuth.authState.pipe(map(auth => auth));
   //  
   }
     user(){
      return this.afAuth.authState.pipe(first()).toPromise();
   }
   erroresFirebase(error:any){
     let retornoError:String="";
     switch(error){
      case "auth/email-already-in-use":
        retornoError="Ese usuaria ya existe";
        break;
      case "auth/invalid-email":
        console.log("entre al error");
        retornoError="Ingrese un mail valido";
        break;
        case "auth/weak-password":
        retornoError="La contraseña debe ser de 6 o mas caracteres";
        break;
        case "auth/wrong-password":
          case "auth/invalid-password":
      case "auth/user-not-found":
        retornoError="Error en el mail/contraseña";
        break;
      case "auth/internal-error":
        retornoError="Error inesperado."
        retornoError+="Asegurese de ingresar datos validos";
        break;
        
     }
     return retornoError;
   }
   async verificarEmail(){
    return (await this.afAuth.currentUser)?.sendEmailVerification(); 
  }
}
