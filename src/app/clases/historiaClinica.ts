import { Turno } from "./turno";

export interface HistoriaClinica {
  id:string,
  idPaciente:string,
  idEspecialista:string,
  idTurno:string,
  altura:number,
  peso:number,
  temepratura:number,
  presion:number,
  fecha:any,
  otros?: {clave:string, valor:any}[],
  paciente?:any,
  especialista?:any,
  turno?:any,
  turnoEntero?:Turno

}