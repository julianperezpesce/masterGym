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


    validar(): any{
        let respuesta = {
            esValido: false,
            mensaje: ''
        }

        //Validation of required Client name and Suscription
        if (this.tipoInscripcion == null || this.tipoInscripcion == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una suscripción';
            return respuesta;
        }

        if (this.cliente == null || this.cliente == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir un cliente';
            return respuesta;
        }

        respuesta.esValido = true;
        return respuesta;
    }
}