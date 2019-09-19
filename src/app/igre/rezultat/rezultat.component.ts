import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { 

    this.poeniAnagram = localStorage.getItem("poeniAnagram");
    this.poeniMojbroj = localStorage.getItem("poeniMojbroj");
    this.poeniVesala = localStorage.getItem("poeniVesala");
    this.poeniGeografija = localStorage.getItem("poeniGeografija");
    this.poeniPehar = localStorage.getItem("poeniPehar");

   this.ukupno = eval(this.poeniAnagram +"+" +this.poeniMojbroj +"+" + this.poeniVesala +"+" + this.poeniGeografija +"+" + this.poeniPehar);

   var podaci = {
    poeniAnagram: this.poeniAnagram,
    poeniMojbroj: this.poeniMojbroj,
    poeniVesala: this.poeniVesala,
    poeniGeografija: this.poeniGeografija,
    poeniPehar: this.poeniPehar,
    poeniUkupno: this.ukupno,
    takmicar : localStorage.getItem("korime")
   }

   this.http.post<{message:string}>('http://localhost:3000/api/igre/igradana/poeni', podaci)
    .subscribe(responseData => {
    alert(responseData.message);
   });


  }

  ngOnInit() {

  }

}
