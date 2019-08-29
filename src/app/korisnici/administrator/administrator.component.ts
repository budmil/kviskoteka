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
  private zahteviSubscription: Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.dohvatiZahteve();
    this.zahteviSubscription = this.authService.getZahteviZaRegistracijuUpdatedListener()
      .subscribe((zahtevi : Korisnik[]) => {
          this.zahteviZaRegistraciju = zahtevi;
      });    
  }

  ngOnDestroy() {
    this.zahteviSubscription.unsubscribe();
  }

  odobriZahtev(korime: string) {
    this.authService.odobriZahtev(korime);
  }
}
