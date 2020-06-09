import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {  

  clientes: Clientes[] = new Array<Clientes>();
  @Input('nombre') nombre: string;
  
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection<any>('clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0;
      resultado.docs.forEach((item)=>{        
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })
  }

  buscarCliente(nombre: string){
    this.clientes.forEach((cliente)=>{
      if (cliente.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        cliente.visible = true;
      }else{        
        cliente.visible = false;
      }
    })
  }

  seleccionarCliente(cliente: Clientes){
    this.nombre = `${cliente.nombre} ${cliente.apellido}`; 
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })
  }

  cancelarCliente(){
    this.nombre = undefined;
  }

}
