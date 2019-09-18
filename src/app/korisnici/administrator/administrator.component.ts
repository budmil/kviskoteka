import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit, OnDestroy {

  zahteviZaRegistraciju : Korisnik[] = [];
  takmicari : Korisnik[] = [];
  private zahteviSubscription: Subscription;
  private takmicariSubscription : Subscription;

  private minDate : Date; 
  private datum : Date;

  constructor(private authService : AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.minDate = new Date();
    this.dovuciVesala();
    this.dovuciPehar();
    this.dovuciAnagram();
    this.dovuciRebus();
    
    this.authService.dohvatiZahteve();
    this.zahteviSubscription = this.authService.getZahteviZaRegistracijuUpdatedListener()
      .subscribe((zahtevi : Korisnik[]) => {
          this.zahteviZaRegistraciju = zahtevi;
      });    

    this.authService.dohvatiTakmicare();
    this.takmicariSubscription = this.authService.getTakmicariUpdatedListener()
      .subscribe((takmicari:Korisnik[]) => {
        this.takmicari = takmicari;
      });
  }

  ngOnDestroy() {
    this.zahteviSubscription.unsubscribe();
    this.takmicariSubscription.unsubscribe();
  }

  odobriZahtev(korime: string) {
    this.authService.odobriZahtev(korime);
  }

  odbijZahtev(korime: string) {
    this.authService.odbijZahtev(korime);
  }

  unaprediUSupervizora(korime: string) {
    this.authService.unaprediUSupervizora(korime);
  }

  anagramilirebus;
  vesala;
  izabranoVesaloId;
  pehari;
  izabraniPeharId;
  anagrami;
  izabraniAnagramId;
  rebusi;
  izabraniRebusId;

  dovuciVesala() {
    this.http.get<{reci: any}>('http://localhost:3000/api/igre/admin/dovuciVesala')
    
    .subscribe(reci => {
        this.vesala = reci.reci;
    });
  }

  dovuciPehar() {
    this.http.get<{pehari :any}>('http://localhost:3000/api/igre/admin/dovuciPehare')
    .subscribe(pehari => {
      this.pehari = pehari.pehari;
    });
  }

  dovuciAnagram() {
    this.http.get<{anagrami: any}>('http://localhost:3000/api/igre/admin/dovuciAnagrame')
    .subscribe(res => {
      console.log(res);
      this.anagrami = res.anagrami; 
   });

  }

  dovuciRebus() {
    this.http.get<{rebusi: any}>('http://localhost:3000/api/igre/admin/dovuciRebuse')
    .subscribe(res => {
      console.log(res);
      this.rebusi = res.rebusi; 
   });
  }

  potvrdi() {

    
    var podaci = { 
      vesala : this.izabranoVesaloId,
      pehar : this.izabraniPeharId,
      anagram: this.izabraniAnagramId,
      rebus: this.izabraniRebusId,
      datum: this.datum.toDateString(),
      anagramilirebus: this.anagramilirebus
    }

    this.http.post<{message:string}>('http://localhost:3000/api/igre/admin/igraDana', podaci)
    .subscribe(responseData => {
    alert(responseData.message);
   });


    
  }
}
