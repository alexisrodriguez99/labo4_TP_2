
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const key="23517984-a89dce5bf6f23e232b41d2b55";
@Injectable({
  providedIn: 'root'
})
export class FotoService {

    
  constructor(private http:HttpClient) { }
  traerFoto(tematica:string){
    return this.http.get("https://pixabay.com/api/?key="+key+"&q="+tematica);
  }
  datosGithub(){
    
    return this.http.get("https://api.github.com/users/alexisrodriguez99");

  }
}
