import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';

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
  brojpoena: number;
  tacanOdgovor = false;
  netacanOdgovor = false;
  odgovor: string = "";
  anagram: { anagram: string; resenje: string } = { anagram: "", resenje: "" };
  constructor(private simpleTimer: SimpleTimer, private router: Router, private http: HttpClient, private socketioService: SocketioService) {
  }

  ngOnInit() {

    console.log(this.anagram);
    this.brojpoena = 0;
    this.brojac = 30;
    this.socketioService.dohvatiAnagram().subscribe(res => {
      this.anagram = { anagram: res.anagram, resenje: res.resenje };
      this.naRedu = res.naRedu;
      this.isLoading = false;


      this.simpleTimer.newTimer("tajmer", 1);
      this.simpleTimer.subscribe("tajmer", () => {
        this.brojac--;
        console.log(this.brojac);
        if (this.brojac == 0) {
          //this.simpleTimer.delTimer(this.tajmer);
          this.kraj();
        }
      });
    });


  }

  proveriOdgovor() {
   // this.simpleTimer.delTimer(this.tajmer);
    if (this.anagram.resenje == this.odgovor) {
      this.tacanOdgovor = true;
      this.brojpoena += 10;
    } else {
      this.netacanOdgovor = true;
    }
    this.kraj();
  }

  kraj() {
    this.simpleTimer.unsubscribe("tajmer");
    this.simpleTimer.delTimer("tajmer");
    this.prikaziVreme = false;;

    this.brojacZaIzlaz = 1;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniAnagram", this.brojpoena.toString());
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

          this.socketioService.zavrsioAnagram();
        }
      }
    });

  }


}

