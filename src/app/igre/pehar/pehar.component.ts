import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pehar',
  templateUrl: './pehar.component.html',
  styleUrls: ['./pehar.component.css']
})
export class PeharComponent implements OnInit {

  brojacZaIzlaz: number;
  brojpoena: number;
  brojac: number;
  k: number;

  pitanje: string;
  odgovor: string;
  pehar: { pitanje: string, odgovor: string }[];

  odgovori: string[][];
  constructor(private simpleTimer: SimpleTimer, private router: Router, private http: HttpClient) {
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

    this.dohvatiPehar();

    this.brojpoena = 0;
    this.brojac = 20;
    this.simpleTimer.newTimer('tajmer', 1, true);
    this.simpleTimer.subscribe('tajmer', () => {
      this.brojac--;
      if (this.brojac == 0) {
        this.simpleTimer.delTimer('tajmer');
        //this.proveri();//moras potvrdis dugme, pre nego sto istekne vreme, inace nula poena
      }
    });

  }

  proveri(odgovor: string, i: string) {
    console.log("proveri");
    console.log(odgovor);
    console.log(i);
    var stringOdgovor = odgovor.toString().split(',').join("")
    if (this.odgovor == stringOdgovor) this.brojpoena += 2;
    this.odgovori[i] = this.odgovor.split("");
    this.sledecePitanje();
  }


  kraj() {
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniPehar", this.brojpoena.toString());
        this.router.navigate(["/rezultat"]);
      }
    });
  }


  dohvatiPehar() {

    this.http.get<{ igraDana: any }>('http://localhost:3000/api/igre/igradana/dohvatiIgruDana')
      .subscribe(res => {
        //console.log(res.igraDana);
        this.http.post<{ pehar: any }>('http://localhost:3000/api/igre/igradana/dohvatiPehar', { peharId: res.igraDana.pehar })
          .subscribe(res => {
            this.pehar = res.pehar;
            this.sledecePitanje();
          });

      });

  }

  sledecePitanje() {
    if (this.k != 13) {
      this.odgovor = this.pehar[this.k].odgovor;
      this.pitanje = this.pehar[this.k].pitanje;
    }
    this.k++;
    //console.log(this.k);
    if (this.k == 14) this.kraj();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }


  keytab(i, j) {
    var indeksElementa = 0;
    for (let k = 1; k <= i; k++) {
      if (k <= 6) indeksElementa += (10 - k);
      if (k > 6) indeksElementa += (k - 4);
    }
    indeksElementa = indeksElementa + j + 1;

    let nextInput = document.getElementById("mat-input-" + indeksElementa);

    if (nextInput != null)  {
      nextInput.focus();   
    }
  }
}
