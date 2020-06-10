import { Component, OnInit } from '@angular/core';
import { Clientes } from '../models/clientes';
import { Inscripcion } from '../models/inscripcion';
import { AngularFirestore } from "@angular/fire/firestore";
import { Precios } from '../models/precios';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Clientes = new Clientes(); 
  precios: Precios[] = new Array<Precios>();
  precioSeleccionado: Precios = new Precios();

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((i)=>{
        let precio = i.data() as Precios;
        precio.id = i.id;
        precio.ref = i.ref;
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Clientes){
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Clientes();
    this.inscripcion.cliente = undefined;
  }

  guardar(){

  }

  seleccionarPrecio(id: string){
    this.precioSeleccionado = this.precios.find(x => x.id == id);
    this.inscripcion.tipoInscripcion = this.precioSeleccionado.ref
    console.log(this.precioSeleccionado);

    this.inscripcion.fecha = new Date();
    
  }

}
