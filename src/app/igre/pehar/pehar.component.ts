import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pehar',
  templateUrl: './pehar.component.html',
  styleUrls: ['./pehar.component.css']
})
export class PeharComponent implements OnInit {


  odgovori: string[][];
  constructor() {

    this.odgovori = [];

    //for(var i: number = 0; i < 13; i++) {
        this.odgovori[0] = new Array<string>(9);
        this.odgovori[1] = new Array<string>(8);
        this.odgovori[2] = new Array<string>(7);
        this.odgovori[3] = new Array<string>(6);;
        this.odgovori[4] = ["","","","",""];
        this.odgovori[5] = ["","","",""];
        this.odgovori[6] = ["","",""];
        this.odgovori[7] = ["","","",""];
        this.odgovori[8] = ["","","","",""];
        this.odgovori[9] = ["","","","","",""];
        this.odgovori[10] = ["","","","","","",""];
        this.odgovori[11] = ["","","","","","","",""];
        this.odgovori[12] = ["","","","","","","","",""];
    //}

   }

  ngOnInit() {
  }

  zavrsi() {
    console.log(this.odgovori[0]);
    console.log(this.odgovori[1]);
    console.log(this.odgovori[2]);
    console.log(this.odgovori[3]);
    console.log(this.odgovori[4]);
    console.log(this.odgovori[5]);
    console.log(this.odgovori[6]);
    console.log(this.odgovori[7]);
    console.log(this.odgovori[8]);
    console.log(this.odgovori[9]);
    console.log(this.odgovori[10]);
    console.log(this.odgovori[11]);
    console.log(this.odgovori[12]);
    console.log(this.odgovori[13]);


  }
}
