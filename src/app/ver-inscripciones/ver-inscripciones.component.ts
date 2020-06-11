import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-ver-inscripciones',
  templateUrl: './ver-inscripciones.component.html',
  styleUrls: ['./ver-inscripciones.component.scss']
})
export class VerInscripcionesComponent implements OnInit {

  inscripciones: any[] = [];
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        console.log(inscripcion.data());
        
        //here we get data from inscripciones
        let inscripcionCliente = inscripcion.data();
        inscripcionCliente.id = inscripcion.id;
        //

        //Here we get all data from client and the path
        this.afs.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{
          inscripcionCliente.clienteGet = cliente.data();        
        })
        //
      })
    })
        
    
  }

}
