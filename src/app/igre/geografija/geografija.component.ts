import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-geografija',
  templateUrl: './geografija.component.html',
  styleUrls: ['./geografija.component.css']
})
export class GeografijaComponent implements OnInit {

  brojpoena: number;
  brojacZaIzlaz: number;

  azbuka = ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','ć','u','f','h','c','č','dž','š'];
  slovo : string;
  brojPojmovaPoOblasti = ['1','2','3','4','5','6','7','8'];
  oblasti = ["Država", "Grad", "Reka", "Jezero", "Planina", "Životinja", "Biljka", "Muzička grupa"];

  unetiPojmovi : string[][];

  constructor(private simpleTimer : SimpleTimer, private router: Router, private http: HttpClient) { 
    this.unetiPojmovi = [];

    for(var i: number = 0; i < 8; i++) {
        this.unetiPojmovi[i] = [];
        for(var j: number = 0; j< 8; j++) {
            this.unetiPojmovi[i][j] = "";
        }
    }

  }

  brojac = 120;

  ngOnInit() {

    this.brojpoena = 0;

    this.slovo = this.azbuka[Math.floor((Math.random()*1000)%this.azbuka.length)];

    this.simpleTimer.newTimer('tajmer', 1, true);
    this.simpleTimer.subscribe('tajmer', () => {
      this.brojac--;
      if (this.brojac==0) {
        this.simpleTimer.delTimer('tajmer');
        this.proveriOdgovore();
      }
    });
  }

  proveriOdgovore() {
    for(var i: number = 0; i < 8; i++) {
    for(var j: number = 0; j< 8; j++) {
        this.http.post<{imaUBazi: Boolean}>('http://localhost:3000/api/igre/geografija/proveriPojam', {slovo: "k", kategorija: this.oblasti[i], termin: this.unetiPojmovi[i][j]})
         .subscribe(res => {
          if (res.imaUBazi) this.brojpoena+=2;
        });
      }
  }
  this.kraj();
  }

  kraj() {
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniGeografija", this.brojpoena.toString());
        this.router.navigate(["/pehar"]);
      }
    });
  }

}
