import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NgxSpinnerModule,
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    
  ],
  providers: [
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
