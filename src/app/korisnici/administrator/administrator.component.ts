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

  zahteviZaRegistraciju: Korisnik[] = [];
  takmicari: Korisnik[] = [];
  private zahteviSubscription: Subscription;
  private takmicariSubscription: Subscription;

  private minDate: Date;
  private datum: Date;

  nekoDanasIgrao: Boolean;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.minDate = new Date();
    this.dovuciVesala();
    this.dovuciPehar();
    this.dovuciAnagram();
    this.dovuciRebus();

    this.http.get<{ nekoDanasIgrao: Boolean }>('http://localhost:3000/api/igre/admin/nekoDanasIgrao')
      .subscribe(res => {
        this.nekoDanasIgrao = res.nekoDanasIgrao;
      });

    this.authService.dohvatiZahteve();
    this.zahteviSubscription = this.authService.getZahteviZaRegistracijuUpdatedListener()
      .subscribe((zahtevi: Korisnik[]) => {
        this.zahteviZaRegistraciju = zahtevi;
      });

    this.authService.dohvatiTakmicare();
    this.takmicariSubscription = this.authService.getTakmicariUpdatedListener()
      .subscribe((takmicari: Korisnik[]) => {
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

  omoguciAzuriranje: Boolean = false;

  dovuciVesala() {
    this.http.get<{ reci: any }>('http://localhost:3000/api/igre/admin/dovuciVesala')

      .subscribe(reci => {
        this.vesala = reci.reci;
      });
  }

  dovuciPehar() {
    this.http.get<{ pehari: any }>('http://localhost:3000/api/igre/admin/dovuciPehare')
      .subscribe(pehari => {
        this.pehari = pehari.pehari;
      });
  }

  dovuciAnagram() {
    this.http.get<{ anagrami: any }>('http://localhost:3000/api/igre/admin/dovuciAnagrame')
      .subscribe(res => {
        console.log(res);
        this.anagrami = res.anagrami;
      });

  }

  dovuciRebus() {
    this.http.get<{ rebusi: any }>('http://localhost:3000/api/igre/admin/dovuciRebuse')
      .subscribe(res => {
        console.log(res);
        this.rebusi = res.rebusi;
      });
  }

  potvrdi() {

    if (this.anagramilirebus == "anagram") {
      this.izabraniRebusId = null;
    } else {
      this.izabraniAnagramId = null;
    }

    var podaci = {
      vesala: this.izabranoVesaloId,
      pehar: this.izabraniPeharId,
      anagram: this.izabraniAnagramId,
      rebus: this.izabraniRebusId,
      datum: this.datum.toDateString(),
      anagramilirebus: this.anagramilirebus
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/igre/admin/igraDana', podaci)
      .subscribe(responseData => {
        alert(responseData.message);
      });

  }


  myFilter = (d: Date): boolean => {
    if (d.toDateString() == new Date().toDateString()) {
      return !this.nekoDanasIgrao;
    } else {
      var danas = new Date().toISOString();
      if (d.toISOString() > danas) return true; else return false;
    }
  }


  izabranDatum() {
    this.http.post<{ igradana: any }>('http://localhost:3000/api/igre/admin/dovuciIgruDana', { datum: this.datum.toDateString() })
      .subscribe(res => {
        if (res.igradana) {
          this.omoguciAzuriranje = true;
          this.izabranoVesaloId = res.igradana.vesala;
          this.izabraniPeharId = res.igradana.pehar;
          this.anagramilirebus = res.igradana.anagramilirebus;
          if (this.anagramilirebus == "anagram") this.izabraniAnagramId = res.igradana.anagram; else this.izabraniRebusId = res.igradana.rebus;
        } else {
          this.omoguciAzuriranje = false;
          this.izabranoVesaloId = "";
          this.izabraniPeharId = "";
          this.anagramilirebus = "";
          this.izabraniAnagramId = "";
          this.izabraniRebusId = "";
        }
      });
  }


  azuriraj() {


    this.omoguciAzuriranje = false;

    if (this.anagramilirebus == "anagram") {
      this.izabraniRebusId = null;
    } else {
      this.izabraniAnagramId = null;
    }


    var podaci = {
      vesala: this.izabranoVesaloId,
      pehar: this.izabraniPeharId,
      anagram: this.izabraniAnagramId,
      rebus: this.izabraniRebusId,
      datum: this.datum.toDateString(),
      anagramilirebus: this.anagramilirebus
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/igre/admin/azurirajIgruDana', podaci)
      .subscribe(responseData => {
        alert(responseData.message);

      });
      
      this.izabranoVesaloId = "";
      this.izabraniPeharId = "";
      this.anagramilirebus = "";
      this.izabraniAnagramId = "";
      this.izabraniRebusId = "";
      this.datum = null;
  }
} 
