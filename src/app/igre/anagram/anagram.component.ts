import { Component, OnInit } from '@angular/core';
import {SimpleTimer} from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.css']
})
export class AnagramComponent implements OnInit {

  isLoading : Boolean = true;
  igramAnagram : Boolean;
  brojacZaIzlaz: number;
  brojac : number;
  brojpoena : number;
  tacanOdgovor = false;
  netacanOdgovor = false;
  odgovor : string = "";
  anagram : {anagram:string; resenje:string} = {anagram:"", resenje:""};

  constructor(private simpleTimer: SimpleTimer, private router:Router, private http: HttpClient) { }

  ngOnInit() {
    this.brojpoena = 0;
    this.brojac = 30;
    this.dohvatiAnagramIliRebus();
    this.simpleTimer.newTimer('tajmer', 1, true);
    this.simpleTimer.subscribe('tajmer', () => {
      this.brojac--;
      if (this.brojac==0) {
        this.simpleTimer.delTimer('tajmer');
        this.kraj();
      }
    });
  }

  proveriOdgovor() {
    if (this.anagram.resenje == this.odgovor) {
      this.tacanOdgovor = true;
      this.brojpoena += 10;
    } else {
      this.netacanOdgovor = true;
    }
    this.kraj();
  }

  dohvatiAnagramIliRebus() {

     this.http.get<{ igraDana: any }>('http://localhost:3000/api/igre/igradana/dohvatiIgruDana')
     .subscribe(res => {
       if (res.igraDana.anagramilirebus == "anagram") { //anagram
        this.igramAnagram = true;
        this.http.post<{zagonetka : string, resenje: string}>('http://localhost:3000/api/igre/igradana/dohvatiAnagram', {anagramId:res.igraDana.anagram})
        .subscribe(res => {
          this.anagram = {anagram: res.zagonetka, resenje: res.resenje} 
        });
       } else {  //rebus
        this.igramAnagram = false;
        this.http.post<{zagonetka : string, resenje: string}>('http://localhost:3000/api/igre/igradana/dohvatiRebus', {rebusId:res.igraDana.rebus})
        .subscribe(res => {
          this.anagram = {anagram: res.zagonetka, resenje: res.resenje} 
        });
       }
 

     });
     this.isLoading = false;
  }

  kraj(){
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniAnagram", this.brojpoena.toString());
        this.router.navigate(["/mojbroj"]);
      }
    });

  }


}
