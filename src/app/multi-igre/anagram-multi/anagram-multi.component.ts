import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-anagram-multi',
  templateUrl: './anagram-multi.component.html',
  styleUrls: ['./anagram-multi.component.css']

})
export class AnagramMultiComponent implements OnInit {


  prikaziVreme = true;
  isLoading = true;
  naRedu: string;
  brojacZaIzlaz: number;
  brojac: number;
  brojpoena: number = 0;
  tacanOdgovor = false;
  netacanOdgovor = false;
  odgovor: string = "";
  anagram: { anagram: string; resenje: string } = { anagram: "", resenje: "" };
  constructor(private simpleTimer: SimpleTimer, private router: Router, private http: HttpClient, private socketioService: SocketioService) {
  }

  dohvatiAnagramSubscription : Subscription;

  ngOnInit() {
    this.prikaziVreme = true;
    console.log(this.anagram);
    this.brojac = 30;
    this.dohvatiAnagramSubscription = this.socketioService.dohvatiAnagram().subscribe(res => {
      this.anagram = { anagram: res.anagram, resenje: res.resenje };
      this.naRedu = res.naRedu;
      this.isLoading = false;


      this.simpleTimer.newTimer("tajmer", 1);
      this.simpleTimer.subscribe("tajmer", () => {
        this.brojac--;
        if (this.brojac == 0) {
          //this.simpleTimer.delTimer(this.tajmer);
          this.proveriOdgovor();
        }
      });
    });


  }
  sracunajPoeneSubscription : Subscription;
  proveriOdgovor() {
   // this.simpleTimer.delTimer(this.tajmer);
    if (this.anagram.resenje == this.odgovor) {
      this.tacanOdgovor = true;
     // this.brojpoena += 10;
    } else {
      this.netacanOdgovor = true;
    }
    this.sracunajPoeneSubscription = this.socketioService.sracunajPoeneAnagram(this.tacanOdgovor)
    .subscribe(ret => {
      console.log(ret);
      if (localStorage.getItem("boja") == "plavi") this.brojpoena+=ret.plavi; else this.brojpoena+=ret.crveni;
      this.kraj();
    });
  }

  kraj() {
    this.sracunajPoeneSubscription.unsubscribe();
    this.dohvatiAnagramSubscription.unsubscribe();
    this.simpleTimer.unsubscribe("tajmer");
    this.simpleTimer.delTimer("tajmer");
    this.prikaziVreme = false;

    this.brojacZaIzlaz = 1;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        this.isLoading = true;
        if (this.naRedu == "plavi") {

          console.log('na redu plavi');
          this.odgovor = "";
          this.tacanOdgovor = false;
          this.netacanOdgovor = false;
          this.anagram = { anagram: "", resenje: "" };
          this.ngOnInit();
        } else {

          console.log('na redu crveni');
          localStorage.setItem("poeniAnagram",this.brojpoena.toString());
          this.socketioService.zavrsioAnagram();
        }
      }
    });

  }


}

