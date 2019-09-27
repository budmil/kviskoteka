import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-geografijamulti',
  templateUrl: './geografijamulti.component.html',
  styleUrls: ['../../igre/geografija/geografija.component.css']
})
export class GeografijamultiComponent implements OnInit {

  primiOdSupervizoraSubscription: Subscription;

  brojpoena: number = 0;
  brojacZaIzlaz: number;

  tacanPojam: Boolean[][];
  cekamSupervizora: Boolean[][];

  brojPojmovaPoslatihSupervizoru: number = -1;

  azbuka = ['a', 'b', 'v', 'g', 'd', 'đ', 'e', 'ž', 'z', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 't', 'ć', 'u', 'f', 'h', 'c', 'č', 'dž', 'š'];
  slovo: string;
  brojPojmovaPoOblasti = ['1', '2', '3', '4', '5', '6', '7', '8'];
  oblasti = ["Država", "Grad", "Reka", "Jezero", "Planina", "Životinja", "Biljka", "Muzička grupa"];
  naRedu;
  unetiPojmovi: string[][];
  onemoguciUnos: Boolean[][];

  constructor(private simpleTimer: SimpleTimer, private router: Router, private http: HttpClient, private socketioService: SocketioService) {
    this.unetiPojmovi = [];
    this.tacanPojam = [];
    this.cekamSupervizora = [];
    this.onemoguciUnos = [];
    for (var i: number = 0; i < 8; i++) {
      this.unetiPojmovi[i] = [];
      this.tacanPojam[i] = [];
      this.cekamSupervizora[i] = [];
      this.onemoguciUnos[i] = [];
      for (var j: number = 0; j < 8; j++) {
        this.unetiPojmovi[i][j] = "";
        this.tacanPojam[i][j] = true;
        this.cekamSupervizora[i][j] = true;
        this.onemoguciUnos[i][j] = false;
      }
    }

  }

  brojac = 120;
  vratiSlovoSubscription: Subscription;

  ngOnInit() {
    this.vratiSlovoSubscription = this.socketioService.vratiSlovoZaGeografiju().subscribe(data => {
      this.slovo = data.slovo;
      this.naRedu = data.naRedu;

      if (this.naRedu == localStorage.getItem("boja")) {
        this.prikazujFlegove = false;
        this.simpleTimer.newTimer('tajmer', 1, true);
        this.simpleTimer.subscribe('tajmer', () => {
          this.brojac--;
          if (this.brojac == 0) {
            this.proveriOdgovore();
          }
        });
      } else {
        this.prikazujFlegove = true;
        this.socketioService.cekamSansu()
          .subscribe(res => {
            this.prikazujFlegove = false;
            this.unetiPojmovi = res.unetiPojmovi;
            this.onemoguciUnos = res.tacanPojam;
            console.log("uneti pojmovi");
            console.log(this.unetiPojmovi);
            console.log("tacna Pojam");
            console.log(this.tacanPojam);
            this.brojac = 30;
            this.simpleTimer.newTimer('tajmer', 1, true);
            this.simpleTimer.subscribe('tajmer', () => {
              this.brojac--;
              if (this.brojac == 0) {
                this.proveriOdgovore();
              }
            });
          });
      }


    });


  }
  prikazujFlegove: Boolean;
  proveriOdgovore() {
    for (var i: number = 0; i < 8; i++) {
      //this.cekamSupervizora[i] = [];

    }
    this.prikazujFlegove = true;
    this.simpleTimer.delTimer('tajmer');
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        if (this.unetiPojmovi[i][j] != "") { //ako je uneo nesto
          this.http.post<{ imaUBazi: Boolean, _i: any, _j: any }>('http://localhost:3000/api/igre/geografija/proveriPojam', { slovo: this.slovo, kategorija: this.oblasti[i], termin: this.unetiPojmovi[i][j], _i: i, _j: j })
            .subscribe(res => {
              if (res.imaUBazi) {
                if (this.onemoguciUnos[res._i][res._j] == false)
                  this.brojpoena += 2;
                //this.cekamSupervizora[res._i][res._j] = false;
                this.tacanPojam[res._i][res._j] = true;
                this.onemoguciUnos[res._i][res._j] = true;
              } else {
                if (this.onemoguciUnos[res._i][res._j] == false) {
                  if (this.brojPojmovaPoslatihSupervizoru == -1) this.brojPojmovaPoslatihSupervizoru++;
                  this.brojPojmovaPoslatihSupervizoru++;
                  this.socketioService.saljiSupervizoru({ slovo: this.slovo, kategorija: this.oblasti[res._i], termin: this.unetiPojmovi[res._i][res._j], _i: res._i, _j: res._j })
                }
              }
            });
        } else {  //ako nije uneo pojam
          //this.onemoguciUnos[i][j] = true;
        }
      }
    }
    this.primiOdSupervizoraSubscription = this.socketioService.primiOdSupervizora()
      .subscribe(res => {
        console.log(res);
        this.cekamSupervizora[res.data.pojam._i][res.data.pojam._j] = false;
        if (res.data.odobravam) {
          console.log(res.data.pojam);
          this.brojpoena += 4;
          this.tacanPojam[res.data.pojam._i][res.data.pojam._j] = true;
          this.onemoguciUnos[res.data.pojam._i][res.data.pojam._j] = true;

        } else {
          this.tacanPojam[res.data.pojam._i][res.data.pojam._j] = false;
        }
        this.brojPojmovaPoslatihSupervizoru--;
        if (this.brojPojmovaPoslatihSupervizoru == 0) {
          //this.kraj();
          console.log("GOTOVO");
          this.kraj();
        }
      });
    if (this.brojPojmovaPoslatihSupervizoru == 0) {
      this.kraj();
    }
  }
  dajSansuDrugom: Subscription;
  kraj() {
    this.primiOdSupervizoraSubscription.unsubscribe();
    this.vratiSlovoSubscription.unsubscribe();
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz == 0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');

        if (this.naRedu == "plavi" && localStorage.getItem("boja") == "plavi") {
          //anuliraj sve pre ngOnInit
          this.dajSansuDrugom = this.socketioService.dajSansuDrugom(this.unetiPojmovi, this.onemoguciUnos)
            .subscribe(res => {
              this.izPocetka();
              this.dajSansuDrugom.unsubscribe();
            });
        }
        if (this.naRedu == "plavi" && localStorage.getItem("boja") == "crveni") {
          this.socketioService.javljamDaSamZavrsio();
          this.izPocetka();
        }

        if (this.naRedu == "crveni" && localStorage.getItem("boja") == "plavi") {
          this.socketioService.javljamDaSamZavrsio();
          localStorage.setItem("poeniGeografija", this.brojpoena.toString());
          this.socketioService.zavrsioGeografiju();
        }

        if (this.naRedu == "crveni" && localStorage.getItem("boja") == "crveni") {
          this.dajSansuDrugom = this.socketioService.dajSansuDrugom(this.unetiPojmovi, this.onemoguciUnos)
            .subscribe(res => {
              localStorage.setItem("poeniGeografija", this.brojpoena.toString());
              this.dajSansuDrugom.unsubscribe();
              this.socketioService.zavrsioGeografiju();
            });
        }

      }
    });
  }

  izPocetka() {
    this.unetiPojmovi = [];
    this.tacanPojam = [];
    this.onemoguciUnos = [];
    this.cekamSupervizora = [];
    for (var i: number = 0; i < 8; i++) {
      this.unetiPojmovi[i] = [];
      this.tacanPojam[i] = [];
      this.cekamSupervizora[i] = [];
      this.onemoguciUnos[i] = [];
      for (var j: number = 0; j < 8; j++) {
        this.unetiPojmovi[i][j] = "";
        this.tacanPojam[i][j] = true;
        this.cekamSupervizora[i][j] = true;
        this.onemoguciUnos[i][j] = false;
      }
    }
    this.brojac = 120;
    this.brojPojmovaPoslatihSupervizoru = -1;
    this.ngOnInit();
  }

}
