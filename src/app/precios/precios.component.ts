import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precios } from '../models/precios';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecios: FormGroup;
  precios: Precios[] = new Array<Precios>();
  esEditar: boolean = false;
  id: string;

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

    this.afs.collection<Precios>('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precios; //sin as Precios da error en push(precio)
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      })
    })
  }

  agregar(){
    this.afs.collection<Precios>('precios').add(this.formularioPrecios.value)
      .then(()=>{
        this.msj.mensajeCorrecto('Suscripcion','Se ha agregado correctamente'); 
        this.formularioPrecios.reset();       
      }).catch(()=>{
        this.msj.mensajeError('Error', 'Se ha producido un error');
      })        
  }

  modificarPrecio(precio: Precios){
    this.esEditar = true;
    this.formularioPrecios.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      cantidad: precio.cantidad,
      tipoSuscripcion: precio.tipoSuscripcion,      
    })
    this.id = precio.id;
  }

  editar(){

  }

  

}
