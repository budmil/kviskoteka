import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core'
import { AuthService } from './auth.service';

@Injectable()
export class SupervizorGuard implements CanActivate{

    constructor(private authService : AuthService, private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isSupervizor = (this.authService.getTip() == "Supervizor");
        if (!isSupervizor) {
            this.router.navigate(['/']);
        }
        return isSupervizor;
    }



}