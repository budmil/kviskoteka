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

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "takmicar", component: TakmicarComponent, canActivate: [AuthGuard] },
  { path: "supervizor", component: SupervizorComponent, canActivate: [AuthGuard, SupervizorGuard] },
  { path: "admin", component: AdministratorComponent, canActivate: [AuthGuard, AdminovGuard] },
  { path: "zaboravljenaLozinka", component: ZaboravljenaLozinkaComponent },
  { path: "tajanstvenoPitanje", component: TajanstvenoPitanjeComponent },
  //{ path: "novaLozinka", component: NovaLozinkaComponent},
  { path: "igradana", component: IgraDanaComponent },
  { path: "vesala", component: VesalaComponent },
  { path: "anagram", component: AnagramComponent },
  { path: "mojbroj", component: MojBrojComponent },
  { path: "geografija", component: GeografijaComponent },
  { path: "pehar", component: PeharComponent },
  { path: "rezultat", component: RezultatComponent },
  { path: "basNovaLozinka", component: BasNovaLozinkaComponent },
  { path: "plavi", component: PlaviComponent },
  { path: "crveni", component: CrveniComponent },
  { path: "anagrammulti", component: AnagramMultiComponent },
  { path: "vesalamulti", component: VesalaMultiComponent },
  { path: "mojbrojmulti", component: MojbrojMultiComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminovGuard, SupervizorGuard]
})
export class AppRoutingModule { }
