import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion {
    fecha: Date;
    fechaDeBaja: Date;
    tipoInscripcion: DocumentReference;

}