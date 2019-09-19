import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';
@Component({
  selector: 'app-pehar-multi',
  templateUrl: './pehar-multi.component.html',
  styleUrls: ['./pehar-multi.component.css']
})
export class PeharMultiComponent implements OnInit {

  brojacZaIzlaz: number;
  brojpoena: number;
  brojac: number;
  k: number;

  mojRed : Boolean;

  pitanje: string;
  odgovor: string;
  pehar: { pitanje: string, odgovor: string }[];

  odgovori: string[][];
  boje = new Array<string>(13);
  constructor(private simpleTimer: SimpleTimer, private router: Router, private socketioService : SocketioService) {
    this.k = 1;
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


    for (let b = 0; b < 13; b++) {
      this.boje[b] = "#0074d9";
    }

  }


  ngOnInit() {

    this.proveri("a",localStorage.getItem("boja"));

    this.brojpoena = 0;
    this.brojac = 20;
    this.simpleTimer.newTimer('tajmer', 1, true);
    this.simpleTimer.subscribe('tajmer', () => {
      this.brojac--;
      if (this.brojac == 0) {
        this.simpleTimer.delTimer('tajmer');
        this.proveri("a","e");
        this.brojac = 20;
        //this.proveri();//moras potvrdis dugme, pre nego sto istekne vreme, inace nula poena
      }
    });

  }

  // proveri(odgovor: string, i: string) {
  //   var stringOdgovor = odgovor.toString().split(',').join("")
  //   if (this.odgovor == stringOdgovor) {
  //     if (localStorage.getItem("boja") == "plavi") this.boje[i] = "blue"; else this.boje[i] = "red";
  //     this.brojpoena += 2;
  //   }

  //   this.odgovori[i] = this.odgovor.split("");
  //   this.sledecePitanje();
  // }


  proveri(odgovor : string, i: string) {
    console.log(odgovor);
    console.log(i);
    if (odgovor != "a") odgovor = odgovor.toString().split(',').join("");
    this.socketioService.dohvatiPehar(odgovor, localStorage.getItem("boja")).subscribe(data => {

      this.pitanje = data.pitanje;
      if (data.odgovor != "a") {
        if (data.odgovor == odgovor) {
         if(data.naRedu == "plavi") this.boje[i] = "blue"; else this.boje[i] = "red";
          //this.brojpoena += 2;
        } 
        this.odgovori[i] = data.odgovor.split("");
        this.k++;
      }
  
      if(data.naRedu == localStorage.getItem("boja")) {
        this.mojRed = true;
      } else {
        this.mojRed = false;
      }


    });


    // if (this.k != 13) {
    //   this.odgovor = this.pehar[this.k].odgovor;
    //   this.pitanje = this.pehar[this.k].pitanje;
    // }
    if (this.k == 14) this.kraj();
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

    if (nextInput != null) {
      nextInput.focus();
    }
  }

}
