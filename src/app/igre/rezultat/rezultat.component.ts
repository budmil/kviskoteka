import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rezultat',
  templateUrl: './rezultat.component.html',
  styleUrls: ['./rezultat.component.css']
})
export class RezultatComponent implements OnInit {

  poeniAnagram;
  poeniMojbroj;
  poeniVesala;
  poeniGeografija;
  poeniPehar;

  ukupno;

  constructor() { 

    this.poeniAnagram = localStorage.getItem("poeniAnagram");
    this.poeniMojbroj = localStorage.getItem("poeniMojbroj");
    this.poeniVesala = localStorage.getItem("poeniVesala");
    this.poeniGeografija = localStorage.getItem("poeniGeografija");
    this.poeniPehar = localStorage.getItem("poeniPehar");

   this.ukupno = eval(this.poeniAnagram +"+" +this.poeniMojbroj +"+" + this.poeniVesala +"+" + this.poeniGeografija +"+" + this.poeniPehar);

  }

  ngOnInit() {

  }

}
