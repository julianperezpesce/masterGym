import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeImagen: number = 0;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage) {

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
    console.log(this.formularioCliente.value);
    
  }

  subirImagen(event){
    let nombreImagen = new Date().getTime().toString();
    const file = event.target.files[0];    
    let fileExtension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
    const filePath = `imagenesDeClientes/${nombreImagen}${fileExtension}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeImagen = parseInt(porcentaje.toString());
      
    })

  }

}
