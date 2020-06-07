import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }


  mensajeCorrecto(titulo: string, texto: string){
    Swal.fire({
      title: titulo, 
      text: texto,     
      icon: "success",
      confirmButtonText: 'Aceptar'
    });
  }

  mensajeAdvertencia(titulo: string, texto: string){
    Swal.fire({
      title: titulo, 
      text: texto,     
      icon: "warning",
      confirmButtonText: 'Aceptar'
    });
  }

  mensajeError(titulo: string, texto: string){
    Swal.fire({
      title: titulo,  
      text: texto,
      icon: "error",
      confirmButtonText: 'Aceptar'
    });
  }
}
