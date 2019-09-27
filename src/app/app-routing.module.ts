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
import { TajanstvenoPitanjeComponent } from './auth/tajanstveno-pitanje/tajanstveno-pitanje.component';
import { BasNovaLozinkaComponent } from './auth/bas-nova-lozinka/bas-nova-lozinka.component';
import { PlaviComponent } from './mod/plavi/plavi.component';
import { CrveniComponent } from './mod/crveni/crveni.component';
import { VesalaMultiComponent } from './multi-igre/vesala-multi/vesala-multi.component';
import { MojBrojComponent } from './igre/moj-broj/moj-broj.component';
import { GeografijaComponent } from './igre/geografija/geografija.component';
import { PeharComponent } from './igre/pehar/pehar.component';
import { RezultatComponent } from './igre/rezultat/rezultat.component';
import { AdminovGuard } from './auth/admin.guard';
import { SupervizorGuard } from './auth/supervizor.guard';
import { MojbrojMultiComponent } from './multi-igre/mojbroj-multi/mojbroj-multi.component';
import { AnagramMultiComponent } from './multi-igre/anagram-multi/anagram-multi.component';
import { PeharMultiComponent } from './multi-igre/pehar-multi/pehar-multi.component';
import { PromeniLozinkuComponent } from './auth/promeni-lozinku/promeni-lozinku.component';
import { RezultatmultiComponent } from './multi-igre/rezultatmulti/rezultatmulti.component';
import { GeografijamultiComponent } from './multi-igre/geografijamulti/geografijamulti.component';
import { TakmicarGuard } from './auth/takmicar.guard';
import { IngameGuard } from './auth/ingame.guard';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "takmicar", component: TakmicarComponent, canActivate: [AuthGuard, TakmicarGuard] },
  { path: "supervizor", component: SupervizorComponent, canActivate: [AuthGuard, SupervizorGuard] },
  { path: "admin", component: AdministratorComponent, canActivate: [AuthGuard, AdminovGuard] },
  { path: "zaboravljenaLozinka", component: ZaboravljenaLozinkaComponent },
  { path: "tajanstvenoPitanje", component: TajanstvenoPitanjeComponent },
  { path: "igradana", component: IgraDanaComponent , canActivate: [IngameGuard] },
  { path: "vesala", component: VesalaComponent , canActivate: [IngameGuard]},
  { path: "anagram", component: AnagramComponent , canActivate: [IngameGuard]},
  { path: "mojbroj", component: MojBrojComponent , canActivate: [IngameGuard]},
  { path: "geografija", component: GeografijaComponent, canActivate: [IngameGuard] },
  { path: "pehar", component: PeharComponent, canActivate: [IngameGuard] },
  { path: "rezultat", component: RezultatComponent , canActivate: [IngameGuard] },
  { path: "basNovaLozinka", component: BasNovaLozinkaComponent, canActivate: [IngameGuard] },
  {path: "promeniLozinku", component: PromeniLozinkuComponent},
  { path: "plavi", component: PlaviComponent, canActivate: [IngameGuard] },
  { path: "crveni", component: CrveniComponent , canActivate: [IngameGuard]},
  { path: "anagrammulti", component: AnagramMultiComponent , canActivate: [IngameGuard]},
  { path: "vesalamulti", component: VesalaMultiComponent , canActivate: [IngameGuard] },
  { path: "mojbrojmulti", component: MojbrojMultiComponent , canActivate: [IngameGuard] },
  { path: "peharmulti", component: PeharMultiComponent , canActivate: [IngameGuard] },
  { path: "geografijamulti", component: GeografijamultiComponent , canActivate: [IngameGuard]} ,
  { path: "rezultatmulti", component: RezultatmultiComponent , canActivate: [IngameGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminovGuard, SupervizorGuard, TakmicarGuard, IngameGuard]
})
export class AppRoutingModule { }
