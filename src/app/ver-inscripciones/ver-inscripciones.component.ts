import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-ver-inscripciones',
  templateUrl: './ver-inscripciones.component.html',
  styleUrls: ['./ver-inscripciones.component.scss']
})
export class VerInscripcionesComponent implements OnInit {

  inscripciones: Inscripcion[] = [];
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        console.log(inscripcion.data());
        
      })
    })
        
    
  }

}
