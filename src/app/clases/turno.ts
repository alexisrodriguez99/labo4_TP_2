export interface Turno {
    id:string,
    idPaciente:string,
    idEspecialista:string,
    especialidad:string,
    dia:number,
    mes:string,
    diaString:string
    // dia:string,
    hora:string,
    estado:string, // pendiente, finalizado, cancelado, aceptado, rechazado
    duracion:number, // en minutos
    fechaCreacion:number,
    resenia:boolean, // comentario que deja el paciente (al finalizar el turno)
    comentarioPaciente:string,
    comentarioEspecialista:string,
    comentarioAdmin:string,
    diagnostico:string,
    tieneCalificacion:boolean,
    calificacion:number, // calificacion que deja el paciente (al finalizar el turno)
    encuestaRealizada:boolean,
    fechaTurnoPedido?:number
  }