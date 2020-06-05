import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup
  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre:['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      dni: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })
  }

  agregar(){
    
  }

}
