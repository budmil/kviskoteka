import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { SocketioService } from '../../socketio.service';

@Component({
  selector: 'app-mojbroj-multi',
  templateUrl: './mojbroj-multi.component.html',
  styleUrls: ['./mojbroj-multi.component.css']
})
export class MojbrojMultiComponent implements OnInit {


  isLoading : Boolean = true;
  brojacZaIzlaz: number;
  izraz: string = "";
  operatori = ["+", "-", "*", "/", "(", ")"];
  vasrezultat = "";
  myTurn: Boolean;

  opseg1 = [" 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 ", " 7 ", " 8 ", " 9 "];
  opseg2 = [" 10 ", " 15 ", " 20 "];
  opseg3 = [" 25 ", " 50 ", " 75 ", " 100 "];
  trazenibroj: number;

  brojac = 60;

  brojpoena: number;

  jednocifreni1;
  jednocifreni2;
  jednocifreni3;
  jednocifreni4;
  dvocifreni1;
  dvocifreni2;

  prikaziVreme : Boolean = false;

  potvrdiclicked = true;
  jednocifreni1clicked = true;
  jednocifreni2clicked = true;
  jednocifreni3clicked = true;
  jednocifreni4clicked = true;
  dvocifreni1clicked = true;
  dvocifreni2clicked = true;

  naRedu;

  constructor(private simpleTimer: SimpleTimer, private router: Router, private socketioService: SocketioService) { }

  ngOnInit() {

    this.brojpoena = 0;
    this.simpleTimer.newTimer('brojeviSeVrte', 0.05, true);

    this.simpleTimer.subscribe('brojeviSeVrte', () => {

      if (this.counter < 1) this.jednocifreni1 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)];
      if (this.counter < 2) this.jednocifreni2 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)];
      if (this.counter < 3) this.jednocifreni3 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)];
      if (this.counter < 4) this.jednocifreni4 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)];
      if (this.counter < 5) this.dvocifreni1 = this.opseg2[Math.floor((Math.random() * 1000) % this.opseg2.length)];
      if (this.counter < 6) this.dvocifreni2 = this.opseg3[Math.floor((Math.random() * 1000) % this.opseg3.length)];

      //if (this.counter == 6) this.simpleTimer.delTimer('brojeviSeVrte');


    });

    this.socketioService.vratiPocetniBroj().subscribe(data => {
      this.trazenibroj = data.trazeniBroj;
      this.isLoading = false;
      this.naRedu = data.naRedu;

      if (data.naRedu == localStorage.getItem("boja")) {  //ja sam na redu
        this.myTurn = true;
      } else {    //nisam na redu
        this.myTurn = false;
        this.socketioService.cekamBroj().subscribe(data => {
          this.counter++;
          if (data.koji == "jednocifreni1") this.jednocifreni1 = data.broj;
          if (data.koji == "jednocifreni2") this.jednocifreni2 = data.broj;
          if (data.koji == "jednocifreni3") this.jednocifreni3 = data.broj;
          if (data.koji == "jednocifreni4") this.jednocifreni4 = data.broj;
          if (data.koji == "dvocifreni1") this.dvocifreni1 = data.broj;
          if (data.koji == "dvocifreni2") this.dvocifreni2 = data.broj;


          if (this.counter == 6){
            this.potvrdiclicked = false;
            this.jednocifreni1clicked = false;
            this.jednocifreni2clicked = false;
            this.jednocifreni3clicked = false;
            this.jednocifreni4clicked = false;
            this.dvocifreni1clicked = false;
            this.dvocifreni2clicked = false;
          }

          if (data.koji == "tajmer") {
            this.brojac = data.broj;
            if (this.brojac == 0) this.kraj();
          }

      

        });
      }
  
    });
  }

  dodajOperator(operator: string) {
    this.izraz += operator;
  }

  obrisiSve() {
    this.izraz = "";
    this.jednocifreni1clicked = false;
    this.jednocifreni2clicked = false;
    this.jednocifreni3clicked = false;
    this.jednocifreni4clicked = false;
    this.dvocifreni1clicked = false;
    this.dvocifreni2clicked = false;
  }

  dodajBroj(name: string) {

    if (name == "jednocifreni1") { this.izraz += this.jednocifreni1; this.jednocifreni1clicked = true; }
    if (name == "jednocifreni2") { this.izraz += this.jednocifreni2; this.jednocifreni2clicked = true; }
    if (name == "jednocifreni3") { this.izraz += this.jednocifreni3; this.jednocifreni3clicked = true; }
    if (name == "jednocifreni4") { this.izraz += this.jednocifreni4; this.jednocifreni4clicked = true; }
    if (name == "dvocifreni1") { this.izraz += this.dvocifreni1; this.dvocifreni1clicked = true; }
    if (name == "dvocifreni2") { this.izraz += this.dvocifreni2; this.dvocifreni2clicked = true; }

  }

  counter = 0;
  stop() {
    this.counter++;
    switch (this.counter) {
      case 1: this.jednocifreni1 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)]; this.socketioService.dodajBroj("jednocifreni1", this.jednocifreni1); break;
      case 2: this.jednocifreni2 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)]; this.socketioService.dodajBroj("jednocifreni2", this.jednocifreni2); break;
      case 3: this.jednocifreni3 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)]; this.socketioService.dodajBroj("jednocifreni3", this.jednocifreni3); break;
      case 4: this.jednocifreni4 = this.opseg1[Math.floor((Math.random() * 1000) % this.opseg1.length)]; this.socketioService.dodajBroj("jednocifreni4", this.jednocifreni4); break;
      case 5: this.dvocifreni1 = this.opseg2[Math.floor((Math.random() * 1000) % this.opseg2.length)]; this.socketioService.dodajBroj("dvocifreni1", this.dvocifreni1); break;
      case 6: {
      this.dvocifreni2 = this.opseg3[Math.floor((Math.random() * 1000) % this.opseg3.length)]; this.socketioService.dodajBroj("dvocifreni2", this.dvocifreni2);
        this.simpleTimer.newTimer('tajmer', 1, true);
        this.simpleTimer.subscribe('tajmer', () => {
          this.brojac--;
          this.socketioService.dodajBroj("tajmer", this.brojac);
          if (this.brojac == 0) {
            this.simpleTimer.delTimer('tajmer');
            this.kraj();
          }
        });
        this.simpleTimer.unsubscribe("brojeviSeVrte");
        this.potvrdiclicked = false;
        this.jednocifreni1clicked = false;
        this.jednocifreni2clicked = false;
        this.jednocifreni3clicked = false;
        this.jednocifreni4clicked = false;
        this.dvocifreni1clicked = false;
        this.dvocifreni2clicked = false;
        this.prikaziVreme = true;
        break;
      }
    }
  }

  kraj() {
    console.log("AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBB");
    //this.simpleTimer.unsubscribe("tajmer");
    //this.simpleTimer.delTimer("tajmer");
    this.prikaziVreme = false;
    this.vasrezultat = eval(this.izraz);
    if (this.vasrezultat == this.trazenibroj.toString()) this.brojpoena += 10;
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniMojbroj", this.brojpoena.toString());
        this.isLoading = true;

        if (this.naRedu == "plavi") {
          this.jednocifreni1clicked = false;
          this.jednocifreni2clicked = false;
          this.jednocifreni3clicked = false;
          this.jednocifreni4clicked = false;
          this.dvocifreni1clicked = false;
          this.dvocifreni2clicked = false;
          this.izraz = "";
          this.vasrezultat="";
          this.brojac = 60;
          this.ngOnInit();
        } else {
          this.socketioService.zavrsioMojbroj();
        }
      }
    });

  }


}
