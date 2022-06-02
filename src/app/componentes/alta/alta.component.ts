import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  constructor(private router:Router, private athSer:AuthService) { }
 usuaria:any;
  ngOnInit(): void {
    this.usuaria=this.athSer.usuarioIngresado;
  }
  usuario(){
    this.router.navigateByUrl('/alta/altaPaciente');

  }
  especialista(){
    this.router.navigateByUrl('/alta/altaEspecialista');

  }
  admin(){
    this.router.navigateByUrl('/alta/admin');

  }
}
