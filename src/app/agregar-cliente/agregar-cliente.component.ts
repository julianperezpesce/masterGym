import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeImagen: number = 0;
  urlImagen: string = '';

  constructor(private fb: FormBuilder, 
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute) {

   }

  ngOnInit(): void {

    //Crear formulario
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

    //Editar Formulario  
      let id = this.activeRoute.snapshot.params.clienteID;
      this.afs.doc<any>(`clientes/${id}`).valueChanges().subscribe((cliente)=>{
        console.log(cliente);
        
      })
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.afs.collection('clientes').add(this.formularioCliente.value)
    .then((mensaje)=>{
      console.log('Registro creado');      
    })
  }

  subirImagen(event){
    if (event.target.files.length > 0) {
      let nombreImagen = new Date().getTime().toString();
      const file = event.target.files[0];    
      let fileExtension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = `imagenesDeClientes/${nombreImagen}${fileExtension}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then((object)=>{
        console.log('imagen cargada');
        
        ref.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;          
        })
      })
      task.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeImagen = parseInt(porcentaje.toString());      
      })      
    }
  }
}
