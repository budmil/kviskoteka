import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { TakmicarComponent } from './korisnici/takmicar/takmicar.component';
import { SupervizorComponent } from './korisnici/supervizor/supervizor.component';
import { AdministratorComponent } from './korisnici/administrator/administrator.component';
import { AuthGuard } from './auth/auth.guard';
import { IgraDanaComponent } from './mod/igra-dana/igra-dana.component';
import { VesalaComponent } from './igre/vesala/vesala.component';
import { AnagramComponent } from './igre/anagram/anagram.component';
import { ZaboravljenaLozinkaComponent } from './auth/zaboravljena-lozinka/zaboravljena-lozinka.component';
import { NovaLozinkaComponent } from './auth/nova-lozinka/nova-lozinka.component';
import { TajanstvenoPitanjeComponent } from './auth/tajanstveno-pitanje/tajanstveno-pitanje.component';
import { BasNovaLozinkaComponent } from './auth/bas-nova-lozinka/bas-nova-lozinka.component';
import { PlaviComponent } from './mod/plavi/plavi.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "takmicar", component:TakmicarComponent, canActivate: [AuthGuard] },
  { path: "supervizor", component:SupervizorComponent , canActivate: [AuthGuard]},
  { path: "admin", component:AdministratorComponent, canActivate: [AuthGuard]},
  { path: "zaboravljenaLozinka", component:ZaboravljenaLozinkaComponent},
  { path: "tajanstvenoPitanje", component: TajanstvenoPitanjeComponent},
  { path: "novaLozinka", component: NovaLozinkaComponent},
  { path: "igradana", component:IgraDanaComponent},
  { path: "vesala", component:VesalaComponent},
  { path: "anagram", component:AnagramComponent},
  { path: "basNovaLozinka", component:BasNovaLozinkaComponent},
  { path: "plavi", component: PlaviComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
