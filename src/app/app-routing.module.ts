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
import { CrveniComponent } from './mod/crveni/crveni.component';
import { VesalaMultiComponent } from './vesala-multi/vesala-multi.component';
import { MojBrojComponent } from './igre/moj-broj/moj-broj.component';
import { GeografijaComponent } from './igre/geografija/geografija.component';
import { PeharComponent } from './igre/pehar/pehar.component';
import { RezultatComponent } from './igre/rezultat/rezultat.component';

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
  { path: "mojbroj", component: MojBrojComponent},
  { path: "geografija", component: GeografijaComponent},
  { path: "pehar", component: PeharComponent},
  { path: "rezultat", component: RezultatComponent},
  { path: "basNovaLozinka", component:BasNovaLozinkaComponent},
  { path: "plavi", component: PlaviComponent},
  { path: "crveni", component: CrveniComponent},
  { path: "vesalamulti", component: VesalaMultiComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
