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

        //Validation of everything IMO not needed, only cliente and suscription 
        //needs to be validated

        if (this.fecha == null || this.fecha == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una fecha';
            return respuesta;
        }

        if (this.fechaDeBaja == null || this.fechaDeBaja == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una fecha de baja';
            return respuesta;
        }

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

        if (this.subTotal <= 0 || this.subTotal == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una suscripción';
            return respuesta;
        }

        if (this.iva <= 0 || this.iva == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una suscripción';
            return respuesta;
        }
        if (this.total <= 0 || this.total == undefined) {
            respuesta.esValido = false;
            respuesta.mensaje = 'Debe elegir una suscripción';
            return respuesta;
        }

        respuesta.esValido = true;
        return respuesta;
    }
}