import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatToolbarModule, MatButtonModule} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PocetnaComponent } from "./pocetna/pocetna.component";
import { TakmicarComponent } from './korisnici/takmicar/takmicar.component';
import { SupervizorComponent } from './korisnici/supervizor/supervizor.component';
import { AdministratorComponent } from './korisnici/administrator/administrator.component';
import { HeaderComponent } from './pocetna/header/header.component';
import { IgraDanaComponent } from './mod/igra-dana/igra-dana.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { LoginComponent } from './auth/login/login.component';
import { PromeniLozinkuComponent } from './auth/promeni-lozinku/promeni-lozinku.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    TakmicarComponent,
    SupervizorComponent,
    AdministratorComponent,
    HeaderComponent,
    IgraDanaComponent,
    RegistracijaComponent,
    LoginComponent,
    PromeniLozinkuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
