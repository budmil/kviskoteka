import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { TakmicarComponent } from './korisnici/takmicar/takmicar.component';
import { SupervizorComponent } from './korisnici/supervizor/supervizor.component';
import { AdministratorComponent } from './korisnici/administrator/administrator.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", component: PocetnaComponent},
  { path: "takmicar", component:TakmicarComponent, canActivate: [AuthGuard] },
  { path: "supervizor", component:SupervizorComponent , canActivate: [AuthGuard]},
  { path: "admin", component:AdministratorComponent, canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
