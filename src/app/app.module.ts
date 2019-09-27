import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import {MatToolbarModule, MatMenuModule, MatTableModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatSortModule, MatCardModule, MatTreeModule, MatSnackBarModule, MatButtonModule, MatExpansionModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule, MatNativeDateModule, MatTabsModule, MatIconModule} from "@angular/material";


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
import { BasNovaLozinkaComponent } from './auth/bas-nova-lozinka/bas-nova-lozinka.component';
import { MojBrojComponent } from './igre/moj-broj/moj-broj.component';
import { PlaviComponent } from './mod/plavi/plavi.component';
import { CrveniComponent } from './mod/crveni/crveni.component';
import { VesalaMultiComponent } from './multi-igre/vesala-multi/vesala-multi.component';
import { SocketioService } from './socketio.service';
import { GeografijaComponent } from './igre/geografija/geografija.component';
import { PeharComponent } from './igre/pehar/pehar.component';
import { RezultatComponent } from './igre/rezultat/rezultat.component';
import { ErrorInterceptor } from './error-interceptor';
import { FooterComponent } from './pocetna/footer/footer.component';
import { MojbrojMultiComponent } from './multi-igre/mojbroj-multi/mojbroj-multi.component';
import { AnagramMultiComponent } from './multi-igre/anagram-multi/anagram-multi.component';
import { PeharMultiComponent } from './multi-igre/pehar-multi/pehar-multi.component';
import { MojspinerComponent } from './mojspiner/mojspiner.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RezultatmultiComponent } from './multi-igre/rezultatmulti/rezultatmulti.component';
import { GeografijamultiComponent } from './multi-igre/geografijamulti/geografijamulti.component';
import { AuthAdminInterceptor } from './auth/auth-admin-interceptor';

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
    BasNovaLozinkaComponent,
    MojBrojComponent,
    PlaviComponent,
    CrveniComponent,
    VesalaMultiComponent,
    GeografijaComponent,
    PeharComponent,
    RezultatComponent,
    FooterComponent,
    MojbrojMultiComponent,
    AnagramMultiComponent,
    PeharMultiComponent,
    MojspinerComponent,
    RezultatmultiComponent,
    GeografijamultiComponent
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
    MatSortModule,
    MatTreeModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    SimpleTimer, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthAdminInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
