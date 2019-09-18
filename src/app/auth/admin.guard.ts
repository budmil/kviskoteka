import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core'
import { AuthService } from './auth.service';

@Injectable()
export class AdminovGuard implements CanActivate{

    constructor(private authService : AuthService, private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAdmin = (this.authService.getTip() == "Admin");
        if (!isAdmin) {
            this.router.navigate(['/']);
        }
        return isAdmin;
    }



}