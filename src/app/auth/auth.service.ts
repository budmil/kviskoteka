import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject, of, Observable } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token : string;
  private tokenTimer : any;
  private korime: string;
  private tip: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }


  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  proveriEmail(email: string) {
    this.http.get<{imaMejla:boolean}>('http://localhost:3000/api/korisnici/email' + '?email=' + email)
            .subscribe(responseData => {
                 var ret;
                if (responseData.imaMejla == true) ret = true;  //ima mejl vec
                else ret =  false;//nema mejla zadatog
                return ret;
             });        
                 
  }

  dodajZahtevZaRegistraciju(ime : string, prezime : string, email : string, zanimanje : string, korime : string, lozinka : string, pol : string, jmbg : string) {
  
    alert("servis");

    const zahtevZaKorisnika:Korisnik = {
      ime : ime,
      prezime : prezime,
      email : email,
      zanimanje : zanimanje,
      korime : korime, 
      lozinka : lozinka,
      pol : pol,
      jmbg : jmbg
    };

    this.http.post<{message:string}>('http://localhost:3000/api/korisnici/signup', zahtevZaKorisnika)
      .subscribe(responseData => {
        alert(responseData.message);
      }
    );
  }


  proveriPodatkeZaLogin(korime : string, lozinka : string) {
      const authData : AuthData = {korime: korime, lozinka:lozinka};
      this.http.post<{token: string, expiresIn: number, tip: string }>(
        "http://localhost:3000/api/korisnici/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.korime = korime;
          this.tip = response.tip;
          this.authStatusListener.next(true);
          const currentTime = new Date();
          const expirationDate = new Date (currentTime.getTime() + expiresInDuration*1000);
          this.saveAuthData(token, expirationDate, this.korime);
          if (response.tip == "Takmicar") {
            this.router.navigate(["/takmicar"]);
          }
          if (response.tip == "Supervizor") {
            this.router.navigate(["/supervizor"]);
          }
          if (response.tip == "Admin") {
            this.router.navigate(["/admin"]);
          }
        }

      });

  }



  izlogujSe() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.korime = null;
    this.tip = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.korime = authInformation.korime;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(()=>{
      this.izlogujSe();
    },duration*1000);
  }

  private saveAuthData(token: string, expirationDate: Date, korime: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("korime", korime);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("korime");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const korime = localStorage.getItem("korime");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      korime: korime
    }
  }

}
