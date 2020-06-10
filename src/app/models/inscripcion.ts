import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion {
    fecha: Date;
    fechaDeBaja: Date;
    cliente: DocumentReference;
    tipoInscripcion: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;

    constructor(){
        this.fecha = null;
        this.fechaDeBaja = null;
        this.cliente = this.cliente;
        this.tipoInscripcion = this.tipoInscripcion;
        this.subTotal = this.subTotal;
        this.iva = this.iva;
        this.total = this.total;
    }
}