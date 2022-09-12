export interface Profesor{
    identificacion: string;
    nombre: string;
    tipoProfesor: string;
    monedaDePago: string;
    tarifaHoraria: any;
    fechaNacimiento?: Date;
    fechaNacimientoMap?: string;
}