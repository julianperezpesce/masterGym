import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();

  constructor(private firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
    // this.firestore.collection('clientes').valueChanges().subscribe((resultado)=>{
    //   this.clientes = resultado;
    // })
    this.clientes.length = 0;
    this.firestore.collection('clientes').get().subscribe((resultado)=>{
      // console.log(resultado.docs);
      
      //FOR STANDAR
      // for(let item of resultado.docs){
      //   console.log(item.id);
      //   console.log(item.ref);
      //   console.log(item.data());        
      // }

      //FOR EACH
      resultado.docs.forEach(item =>{
        // console.log(item.id);
        // console.log(item.ref);
        // console.log(item.data()); 
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })
    })
  }
}
