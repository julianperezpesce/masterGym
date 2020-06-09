import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('')
  }

}
