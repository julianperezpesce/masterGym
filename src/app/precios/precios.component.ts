import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecios: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipoSuscripcion: ['', Validators.required]
    })
  }

}
