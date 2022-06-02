import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUser();
  }

  async checkUser(): Promise<boolean> {  
    const user = await this.authService.isAuth().subscribe(
        auth =>{
              if(auth){
                  console.log("ddas");
      return true;
     
    }
    else
    {
      Swal.fire('Por favor, iniciá sesion!!', 'Tenés que iniciar sesión para poder acceder a la pagina', 'error');
      this.router.navigateByUrl('/login');
      return false;
    }
   }
    );
   return true;
  }

}