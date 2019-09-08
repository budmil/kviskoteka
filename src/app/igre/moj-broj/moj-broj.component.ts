import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moj-broj',
  templateUrl: './moj-broj.component.html',
  styleUrls: ['./moj-broj.component.css']
})
export class MojBrojComponent implements OnInit {
  brojacZaIzlaz: number;
  izraz : string = "";
  operatori = ["+","-", "*", "/","(",")"];
  vasrezultat = "";

  opseg1 = [" 1 "," 2 "," 3 "," 4 "," 5 "," 6 ", " 7 "," 8 "," 9 "];
  opseg2 = [" 10 "," 15 ", " 20 "];
  opseg3 = [" 25 "," 50 "," 75 "," 100 "];
  trazenibroj : number;

  brojac = 60;

  brojpoena : number;

  jednocifreni1 ;
  jednocifreni2 ;
  jednocifreni3 ;
  jednocifreni4 ;
  dvocifreni1 ;
  dvocifreni2 ;

  constructor(private simpleTimer : SimpleTimer, private router : Router) { }

  ngOnInit() { 
    this.brojpoena = 0;
    this.simpleTimer.newTimer('brojeviSeVrte', 0.05, true);
    this.simpleTimer.subscribe('brojeviSeVrte', () => {
      
      if (this.counter < 1) this.jednocifreni1 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];   
      if (this.counter < 2) this.jednocifreni2 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  
      if (this.counter < 3)this.jednocifreni3 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)]; 
      if (this.counter < 4)this.jednocifreni4 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  
      if (this.counter < 5)this.dvocifreni1 = this.opseg2[Math.floor((Math.random()*1000)%this.opseg2.length)];  
      if (this.counter < 6)this.dvocifreni2 = this.opseg3[Math.floor((Math.random()*1000)%this.opseg3.length)];  
      if (this.counter < 7)this.trazenibroj = Math.floor((Math.random()*1000)%999) + 1;  

      if (this.counter == 7) this.simpleTimer.delTimer('brojeviSeVrte');
      
    });


 
  }

  dodajOperator(operator : string) {
    console.log("uso u dodavanje operatora");
    this.izraz += operator;
  }

  obrisi(){
   this.izraz = this.izraz.slice(0,this.izraz.length-1);
  }

  obrisiSve() {
    this.izraz = "";
  }

  dodajBroj(name : string) {
    
    if (name == "jednocifreni1") this.izraz += this.jednocifreni1;
    if (name == "jednocifreni2") this.izraz += this.jednocifreni2;
    if (name == "jednocifreni3") this.izraz += this.jednocifreni3;
    if (name == "jednocifreni4") this.izraz += this.jednocifreni4;
    if (name == "dvocifreni1") this.izraz += this.dvocifreni1;
    if (name == "dvocifreni2") this.izraz += this.dvocifreni2;

  }

  counter = 0;
  stop() {
    this.counter++;
    switch(this.counter) {
      case 1:   this.jednocifreni1 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  break;
      case 2:   this.jednocifreni2 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  break;
      case 3:   this.jednocifreni3 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  break;
      case 4:   this.jednocifreni4 = this.opseg1[Math.floor((Math.random()*1000)%this.opseg1.length)];  break;
      case 5:   this.dvocifreni1 = this.opseg2[Math.floor((Math.random()*1000)%this.opseg2.length)];  break;
      case 6:   this.dvocifreni2 = this.opseg3[Math.floor((Math.random()*1000)%this.opseg3.length)];  break;
      case 7:   {
        this.trazenibroj = Math.floor((Math.random()*1000)%999) + 1;
        this.simpleTimer.newTimer('tajmer', 1, true);
        this.simpleTimer.subscribe('tajmer', () => {
          this.brojac--;
          if (this.brojac==0) {
            this.simpleTimer.delTimer('tajmer');
            this.kraj();
          }
        });
        break;
      }
    }
  }

  kraj(){
    this.vasrezultat = eval(this.izraz);
    if (this.vasrezultat == this.trazenibroj.toString()) this.brojpoena+=10;
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniMojbroj", this.brojpoena.toString());
        this.router.navigate(["/vesala"]);
      }
    });

  }

}
