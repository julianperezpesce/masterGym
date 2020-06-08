import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecios: FormGroup;
  precios: any[] = new Array<any>();

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private msj: MensajesService,
    ) { }

  ngOnInit(): void {
    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipoSuscripcion: ['', Validators.required]
    })

    this.afs.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>{
        let precio = dato.data();
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      })
    })
  }

  agregar(){
    this.afs.collection('precios').add(this.formularioPrecios.value)
      .then(()=>{
        this.msj.mensajeCorrecto('Suscripcion','Se ha agregado correctamente'); 
        this.formularioPrecios.reset();       
      }).catch(()=>{
        this.msj.mensajeError('Error', 'Se ha producido un error');
      })
        
  }

  editar(){

  }

}
