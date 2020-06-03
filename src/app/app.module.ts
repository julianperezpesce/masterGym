import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
