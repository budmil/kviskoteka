import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private authService : AuthService) { }

  ngOnInit() {
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

  unaprediUSupervizora(korime: string) {
    this.authService.unaprediUSupervizora(korime);
  }
}
