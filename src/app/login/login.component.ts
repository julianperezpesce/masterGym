import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrectos: boolean = true;
  datosErroneo: string = "";
  constructor(private creadorFormulario: FormBuilder,
    public afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  login(){
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.afAuth.auth.signInWithEmailAndPassword(
        this.formularioLogin.value.email,
        this.formularioLogin.value.password
      ).then((usuario)=>{
        console.log(usuario); 
        this.spinner.hide();       
      }).catch((error)=>{
        this.datosCorrectos = false;
        this.datosErroneo = error.message;
      });
    }else{
      this.datosCorrectos = false;
      this.datosErroneo = "Usuario o contraseña incorrecta";
    }
  }

}
