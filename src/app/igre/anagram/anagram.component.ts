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

  brojacZaIzlaz: number;
  brojac : number;
  tacanOdgovor = false;
  netacanOdgovor = false;
  odgovor : string = "";
  anagram : {anagram:string; resenje:string} = {anagram:"", resenje:""};

  constructor(private simpleTimer: SimpleTimer, private router:Router, private http: HttpClient) { }

  ngOnInit() {
    this.brojac = 10;
    this.dohvatiAnagram();
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
    } else {
      this.netacanOdgovor = true;
    }
    this.kraj();
  }

  dohvatiAnagram() {

    this.http.get<{zagonetka : string, resenje: string}>('http://localhost:3000/api/igre/anagram/dohvati')
      .subscribe(res => {
        console.log(res);
        this.anagram = {anagram: res.zagonetka, resenje: res.resenje} 
     });
  

    
    // let anagrami : {anagram:string; resenje:string}[] = [{anagram:"Radna skela",resenje:"Aleksandar"} , 
    //                                                   {anagram: "Oblast s puno krvoloka!",resenje: "Balkansko poluostrvo"},
    //                                                   {anagram:"Vraški Rus je pesnička legenda!",resenje:"Aleksandar Sergejevič Puškin"}, 
    //                                                   {anagram:"Oni mi skršili vagu!",resenje:"Suvišni kilogrami"},
    //                                                   {anagram:"Krasan je odmor", resenje:"Jadransko more"}];

    // return anagrami[Math.floor((Math.random()*1000)%anagrami.length)];
  }

  kraj(){
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        this.router.navigate(["/vesala"]);
      }
    });

  }


}
