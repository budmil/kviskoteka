import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import {MatToolbarModule, MatCardModule, MatTreeModule, MatSnackBarModule, MatButtonModule, MatExpansionModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule} from "@angular/material";


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
import { VesalaComponent } from './igre/vesala/vesala.component';
import { AnagramComponent } from './igre/anagram/anagram.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { ZaboravljenaLozinkaComponent } from './auth/zaboravljena-lozinka/zaboravljena-lozinka.component';
import { TajanstvenoPitanjeComponent } from './auth/tajanstveno-pitanje/tajanstveno-pitanje.component';
import { NovaLozinkaComponent } from './auth/nova-lozinka/nova-lozinka.component';
import { BasNovaLozinkaComponent } from './auth/bas-nova-lozinka/bas-nova-lozinka.component';
import { MojBrojComponent } from './igre/moj-broj/moj-broj.component';
import { PlaviComponent } from './mod/plavi/plavi.component';
import { CrveniComponent } from './mod/crveni/crveni.component';
import { VesalaMultiComponent } from './vesala-multi/vesala-multi.component';
import { SocketioService } from './socketio.service';
import { GeografijaComponent } from './igre/geografija/geografija.component';
import { PeharComponent } from './igre/pehar/pehar.component';

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
    PromeniLozinkuComponent,
    VesalaComponent,
    AnagramComponent,
    ZaboravljenaLozinkaComponent,
    TajanstvenoPitanjeComponent,
    NovaLozinkaComponent,
    BasNovaLozinkaComponent,
    MojBrojComponent,
    PlaviComponent,
    CrveniComponent,
    VesalaMultiComponent,
    GeografijaComponent,
    PeharComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTreeModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
