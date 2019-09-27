import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class IngameGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


        switch (state.url) {
            case "/igradana": if (this.router.url !== "/takmicar") { this.router.navigate(['']); return false } else return true;
            case "/anagram": if (this.router.url !== "/igradana") { this.router.navigate(['']); return false } else return true;
            case "/mojbroj": if (this.router.url !== "/anagram") { this.router.navigate(['']); return false } else return true;
            case "/vesala": if (this.router.url !== "/mojbroj") { this.router.navigate(['']); return false } else return true;
            case "/geografija": if (this.router.url !== "/vesala") { this.router.navigate(['']); return false } else return true;
            case "/pehar": if (this.router.url !== "/geografija") { this.router.navigate(['']); return false } else return true;
            case "/rezultat": if (this.router.url !== "/pehar") { this.router.navigate(['']); return false } else return true;
            case "/plavi": if (this.router.url !== "/takmicar") { this.router.navigate(['']); return false } else return true;
            case "/crveni": if (this.router.url !== "/takmicar") { this.router.navigate(['']); return false } else return true;
            case "/anagrammulti": if (this.router.url !== "/plavi" && this.router.url !== "/crveni") { this.router.navigate(['']); return false } else return true;
            case "/mojbrojmulti": if (this.router.url !== "/anagrammulti") { this.router.navigate(['']); return false } else return true;
            case "/vesalamulti": if (this.router.url !== "/mojbrojmulti") { this.router.navigate(['']); return false } else return true;
            case "/geografijamulti": if (this.router.url !== "/vesalamulti") { this.router.navigate(['']); return false } else return true;
            case "/peharmulti": if (this.router.url !== "/geografijamulti") { this.router.navigate(['']); return false } else return true;
            case "/rezultatmulti": if (this.router.url !== "/peharmulti") { this.router.navigate(['']); return false } else return true;
        }

        if (state.url.includes("basNovaLozinka?korime=")) { if (this.router.url !== "/zaboravljenaLozinka") { this.router.navigate(['']); return false } else return true; }


    }
}