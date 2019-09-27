import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core'
import { AuthService } from './auth.service';

@Injectable()
export class TakmicarGuard implements CanActivate{

    constructor(private authService : AuthService, private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isTakmicar = (this.authService.getTip() == "Takmicar");
        if (!isTakmicar) {
            this.router.navigate(['/']);
        }
        return isTakmicar;
    }



}