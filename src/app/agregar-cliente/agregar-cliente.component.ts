import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeImagen: number = 0;
  urlImagen: string = '';
  esEditable: boolean = false;
  id: string;

  constructor(
    private fb: FormBuilder, 
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
    this.id = this.activeRoute.snapshot.params.clienteID; 
    if (this.id != undefined) {
      this.esEditable = true;      
      this.afs.doc<any>(`clientes/${this.id}`).valueChanges().subscribe((cliente)=>{
        
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          dni: cliente.dni,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substring(0,10),
          telefono: cliente.telefono,     
          imgUrl: ''     
        })

        this.urlImagen = cliente.imgUrl;
      })
    }       
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.afs.collection('clientes').add(this.formularioCliente.value)
    .then((mensaje)=>{
      console.log('Registro creado');      
    })
  }

  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.afs.doc(`clientes/${this.id}`).update(this.formularioCliente.value).then((mensaje)=>{
      console.log("Cambio realizado")           
    }).catch(()=>{
      console.log("Error");      
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
        console.log('Imagen cargada');
        
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
