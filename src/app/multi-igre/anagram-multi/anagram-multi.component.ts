import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from 'src/app/socketio.service';

@Component({
  selector: 'app-anagram-multi',
  //templateUrl: '../../igre/anagram/anagram.component.html',
  templateUrl:'./anagram-multi.component.html',
  //styleUrls: ['../../igre/anagram/anagram.component.css']
  styleUrls: ['./anagram-multi.component.css']

})
export class AnagramMultiComponent implements OnInit {

  
  brojacZaIzlaz: number;
  brojac : number;
  brojpoena : number;
  tacanOdgovor = false;
  netacanOdgovor = false;
  odgovor : string = "";
  anagram : {anagram:string; resenje:string} = {anagram : "", resenje:""};

  constructor(private simpleTimer: SimpleTimer, private router:Router, private http: HttpClient, private socketioService : SocketioService) {    
   }

  ngOnInit() {
 
    console.log(this.anagram);
    this.brojpoena = 0;
    this.brojac = 10;
    this.socketioService.dohvatiAnagram().subscribe(res => {
      this.anagram = {anagram: res.anagram, resenje: res.resenje};
      console.log(this.anagram);
      this.simpleTimer.newTimer('tajmer', 1, true);
      this.simpleTimer.subscribe('tajmer', () => {
        this.brojac--;
        if (this.brojac==0) {
          this.simpleTimer.delTimer('tajmer');
          this.kraj();
        }
      });
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

  kraj(){
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniAnagram", this.brojpoena.toString());
        this.router.navigate(["/mojbrojmulti"]);
      }
    });

  }


}
