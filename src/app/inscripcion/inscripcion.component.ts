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
    //Setting Firestore database
    this.afs.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((i)=>{
        let precio = i.data() as Precios;
        precio.id = i.id;
        precio.ref = i.ref;
        this.precios.push(precio)
      })
    })
    //
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
    //Setting Date
    this.inscripcion.fecha = new Date();
    if (this.precioSeleccionado.tipoSuscripcion == 1) {
      let cantidad = this.precioSeleccionado.cantidad;
      let fechaDeBaja = new Date(
        this.inscripcion.fecha.getFullYear(),        
        this.inscripcion.fecha.getMonth() + cantidad,
        this.inscripcion.fecha.getDate()
        )
      this.inscripcion.fechaDeBaja = fechaDeBaja;
    }else{
      if (this.precioSeleccionado.tipoSuscripcion == 2) {
        //Six months it's calculated by months 1 semestre = 6 months
        let meses: number = this.precioSeleccionado.cantidad + this.inscripcion.fecha.getMonth();
        let anio: number = this.inscripcion.fecha.getFullYear();
        let dias: number = this.inscripcion.fecha.getDate();
        //
        let fechaDeBaja = new Date(anio, meses, dias);
        this.inscripcion.fechaDeBaja = fechaDeBaja;
      }
    }if (this.precioSeleccionado.tipoSuscripcion == 3) {
        //Anual it's calculated by months 1 year = 12 months
        let meses: number = this.precioSeleccionado.cantidad + this.inscripcion.fecha.getMonth();
        let anio: number = this.inscripcion.fecha.getFullYear();
        let dias: number = this.inscripcion.fecha.getDate();
        //
        let fechaDeBaja = new Date(anio, meses, dias);
        this.inscripcion.fechaDeBaja = fechaDeBaja;
    }

  }

}

// <option value="1">Mensual</option>
// <option value="2">Semestral</option>
// <option value="3">Anual</option>
// <option value="4">Anualx2</option>