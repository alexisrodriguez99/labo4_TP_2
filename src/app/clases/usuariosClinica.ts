export interface UsuariosClinica {
    id: any;
    perfil:string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    mail: string;
    contrasenia: string;
    img1: string;
    img2?: string;
    obraSocial?: string;
    especialidad?: [];
    permiso?:boolean;

   // fotoPelicula:string;
 }