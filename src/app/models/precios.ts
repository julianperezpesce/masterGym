import { DocumentReference } from "@angular/fire/firestore";

export class Precios {
    id: string;
    nombre: string;
    costo: number;
    cantidad: number;
    tipoSuscripcion: number;
    ref: DocumentReference;
}