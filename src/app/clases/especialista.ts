export interface Especialista {
    id: any;
    perfil:string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    mail: string;
    contrasenia: string;
    img1: string;
    especialidad: [];
    permiso:boolean;
    horario?: {empieza:string, termina:string}, // inicio de la jornada, fin de la jornada
    // diasLaborables:string[], // de lunes a sabado..
  
    diasLaborables?:any;
   // fotoPelicula:string;
 }