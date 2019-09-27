import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-pehar-multi',
  templateUrl: './pehar-multi.component.html',
  styleUrls: ['./pehar-multi.component.css']
})
export class PeharMultiComponent implements OnInit {

  brojacZaIzlaz: number;
  brojpoena: number = 0;
  brojac: number;
  k: number;
  naRedu: string;
  pitanje: string;
  odgovor: string;
  pehar: { pitanje: string, odgovor: string }[];

  odgovori: string[][];
  boje = new Array<string>(13);

  naReduSubscription: Subscription;
  dohvatiPeharSubscription: Subscription;

  mojRed: Boolean;

  constructor(private simpleTimer: SimpleTimer, private router: Router, private http: HttpClient, private socketioService: SocketioService) {
    this.k = 0;
    this.odgovori = [];

    this.odgovori[0] = new Array<string>(9);
    this.odgovori[1] = new Array<string>(8);
    this.odgovori[2] = new Array<string>(7);
    this.odgovori[3] = new Array<string>(6);
    this.odgovori[4] = new Array<string>(5);
    this.odgovori[5] = new Array<string>(4);
    this.odgovori[6] = new Array<string>(3);
    this.odgovori[7] = new Array<string>(4);
    this.odgovori[8] = new Array<string>(5);
    this.odgovori[9] = new Array<string>(6);
    this.odgovori[10] = new Array<string>(7);
    this.odgovori[11] = new Array<string>(8);
    this.odgovori[12] = new Array<string>(9);

  }


  ngOnInit() {


    for (let b = 0; b < 13; b++) {
      this.boje[b] = "#0aaaab";
    }

    this.dohvatiPehar();
    this.brojac = 20;
    this.simpleTimer.newTimer('tajmer', 1, true);
    this.simpleTimer.subscribe('tajmer', () => {
      this.brojac--;
      if (this.brojac == 0) {
       // this.odgovori[this.k-1] = this.odgovor.split("");
        this.socketioService.proveriPehar(false, localStorage.getItem("boja"), (this.k-1).toString());
        //this.proveri();//moras potvrdis dugme, pre nego sto istekne vreme, inace nula poena
      }
    });

  }

  proveri(odgovor: string, i: string) {
    console.log("i = " + i + " ; k = " + this.k);
    var stringOdgovor = odgovor.toString().split(',').join("");
    if (this.odgovor == stringOdgovor) {
      this.socketioService.proveriPehar(true, localStorage.getItem("boja"), i);
      if (localStorage.getItem("boja") == "plavi") this.boje[i] = "#0074d9"; else this.boje[i] = "#DC143C";
      this.brojpoena += 2;
      this.odgovori[i] = this.odgovor.split("");

    } else {
      this.socketioService.proveriPehar(false, localStorage.getItem("boja"), i);
    }

  }




  dohvatiPehar() {

    this.dohvatiPeharSubscription = this.socketioService.dohvatiPehar()
      .subscribe(data => {
        this.naRedu = data.naRedu;
        this.pehar = data.pehar;
        if (data.naRedu == localStorage.getItem("boja")) this.mojRed = true; else this.mojRed = false;
        this.sledecePitanje();

        this.naReduSubscription = this.socketioService.naRedu().
          subscribe(data => {
            this.brojac = 10;
            if (data.naRedu == localStorage.getItem("boja")) {
              this.mojRed = true;
            } else {
              this.mojRed = false;
            }
            if (data.tacno) {
              if (data.naRedu == "crveni") this.boje[data.i] = "#DC143C"; else this.boje[data.i] = "#0074d9";
              this.odgovori[data.i] = this.odgovor.split("");
              this.sledecePitanje();
            } else {
            if (data.otkrijResenje) {
              this.odgovori[data.i] = this.odgovor.split("");
              this.sledecePitanje();
            }}
          });

      });
  }

  sledecePitanje() {

    if (this.k != 13) {
      this.odgovor = this.pehar[this.k].odgovor;
      this.pitanje = this.pehar[this.k].pitanje;
    }
;    this.k++;
    if (this.k == 14) this.kraj();
  }

  kraj() {
    this.simpleTimer.delTimer('tajmer');
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        if (this.naRedu == "plavi") {
          this.brojac = 20;
          this.k = 0;
          this.pitanje = "";
          this.odgovor = "";
          this.odgovori = null;
          this.odgovori = [];
          this.naReduSubscription.unsubscribe();
          this.dohvatiPeharSubscription.unsubscribe();
          this.odgovori[0] = new Array<string>(9);
          this.odgovori[1] = new Array<string>(8);
          this.odgovori[2] = new Array<string>(7);
          this.odgovori[3] = new Array<string>(6);
          this.odgovori[4] = new Array<string>(5);
          this.odgovori[5] = new Array<string>(4);
          this.odgovori[6] = new Array<string>(3);
          this.odgovori[7] = new Array<string>(4);
          this.odgovori[8] = new Array<string>(5);
          this.odgovori[9] = new Array<string>(6);
          this.odgovori[10] = new Array<string>(7);
          this.odgovori[11] = new Array<string>(8);
          this.odgovori[12] = new Array<string>(9);
          this.ngOnInit();
        } else {
          localStorage.setItem("poeniPehar", this.brojpoena.toString());
          this.socketioService.zavrsioPehar();
        }
      }
    });
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }


  keytab(i, j) {
    // var indeksElementa = 0;
    // for (let k = 1; k <= i; k++) {
    //   if (k <= 6) indeksElementa += (10 - k);
    //   if (k > 6) indeksElementa += (k - 4);
    // }
    // indeksElementa = indeksElementa + j + 1;s
    let bla = eval(j + 1);
    let nextInput = document.getElementById("mat-input-" + i + bla);

    if (nextInput != null) {
      nextInput.focus();
    }
  }

}
