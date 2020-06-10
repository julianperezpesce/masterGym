import { Component, OnInit } from '@angular/core';
import { Clientes } from '../models/clientes';
import { Inscripcion } from '../models/inscripcion';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Clientes = new Clientes(); 

  constructor() { }

  ngOnInit(): void {
  }

  asignarCliente(cliente: Clientes){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Clientes();
  }

}
