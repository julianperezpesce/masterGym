import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion {
    fecha: Date;
    fechaDeBaja: Date;
    cliente: DocumentReference;
    tipoInscripcion: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;
}