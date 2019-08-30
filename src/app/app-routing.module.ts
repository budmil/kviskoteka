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

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "takmicar", component:TakmicarComponent, canActivate: [AuthGuard] },
  { path: "supervizor", component:SupervizorComponent , canActivate: [AuthGuard]},
  { path: "admin", component:AdministratorComponent, canActivate: [AuthGuard]},
  { path: "igradana", component:IgraDanaComponent},
  { path: "vesala", component:VesalaComponent},
  { path: "anagram", component:AnagramComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
