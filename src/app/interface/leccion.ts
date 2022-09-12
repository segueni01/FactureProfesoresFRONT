export interface Leccion {
    idProfesor: string;
    nombreProfesor?: string;
    codigo: string;
    curso: string;
    horasDictadas: string;
    valorLeccion?: any;
    fecha: Date;
    monedaDePago?: string;
}