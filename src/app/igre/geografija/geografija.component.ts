import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
  selector: 'app-geografija',
  templateUrl: './geografija.component.html',
  styleUrls: ['./geografija.component.css']
})
export class GeografijaComponent implements OnInit {

  azbuka = ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','ć','u','f','h','c','č','dž','š'];
  slovo : string;
  brojPojmovaPoOblasti = ['1','2','3','4','5','6','7','8'];
  oblasti = ["Države", "Gradovi", "Reke", "Jezera", "Planine", "Životinje", "Biljke", "Muzička grupa"];

  unetiPojmovi : string[][];

  constructor(private simpleTimer : SimpleTimer) { 
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
    console.log('proevi');
    for(var i: number = 0; i < 8; i++) {
      for(var j: number = 0; j< 8; j++) {
          //proveri da li se nalazi u bazi i daj poene na osnovu toga
      }
  }
  }

}
