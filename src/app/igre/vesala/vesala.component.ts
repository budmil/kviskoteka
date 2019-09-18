import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vesala',
  templateUrl: './vesala.component.html',
  styleUrls: ['./vesala.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({ 'opacity': '1' })),
      state('out', style({ 'opacity': '0.7' })),
      transition('* <=> *', [
        animate(300)
      ])
    ])
  ]
})



export class VesalaComponent implements OnInit {

  brojacZaIzlaz: number;
  brojpoena : number;

  azbuka = ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','ć','u','f','h','c','č','dž','š'];
  slova : string[];
  usloviZaPrikaz : Boolean[];
  uspesno = false;
  numOfGuesses : number;
  obesen = false;
  recZaPogadjanje : string;

  choice = 2;
  state = 'in';
  counter = 0;
  enableAnimation = false;
  imageSource = '';

  slikaCeo = 'assets/images/cicaglisa_ceo.png';
  slikaRuke = 'assets/images/cicaglisa_ruke.png';
  slikaGlava = 'assets/images/cicaglisa_glava.png';
  slikaTrup = 'assets/images/cicaglisa_trup.png';
  slikaPrazan = 'assets/images/cicaglisa_prazan.png';


  constructor(private router: Router, private simpleTimer: SimpleTimer, private http: HttpClient) {}

  ngOnInit() {
    this.brojpoena = 0;

    this.numOfGuesses = 0;
    this.vratiRecZaPogadjanje();
 
  }


  proveri(slovo:string) {
    var bla = false;
    for (let i = 0; i<this.recZaPogadjanje.length; i++) {
      if (this.recZaPogadjanje[i] == slovo) {
        this.usloviZaPrikaz[i] = true;
        this.numOfGuesses++;
        bla = true;
      }
    }
    if (this.numOfGuesses==this.recZaPogadjanje.length) { 
      this.uspesno = true; 
      this.choice = 2;
      this.state = 'in';
      this.counter = 0;
      this.enableAnimation = false;
      this.imageSource = '';
      this.brojpoena += 10;
      this.kraj();
    }
    if (bla==true) return;
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();  
  }

  toggleImg() {

    switch(this.choice) {
      case 1: this.imageSource = this.slikaPrazan; this.choice++; break;
      case 2: this.imageSource = this.slikaGlava; this.choice++; break;
      case 3: this.imageSource = this.slikaTrup; this.choice++; break;
      case 4: this.imageSource = this.slikaRuke; this.choice++; break;
      case 5: this.imageSource = this.slikaCeo; this.obesen = true; this.choice = 1; this.kraj(); break;
    }
  }

  onDone($event) {
    if (this.enableAnimation) {
      if (this.counter === 1) {
        this.toggleImg();
      }
      this.toggleState();
    }
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
  }

  kraj() {
    this.brojacZaIzlaz = 3;
    this.simpleTimer.newTimer('tajmerZaIzlaz', 1, true);
    this.simpleTimer.subscribe('tajmerZaIzlaz', () => {
      this.brojacZaIzlaz--;
      if (this.brojacZaIzlaz==0) {
        this.simpleTimer.delTimer('tajmerZaIzlaz');
        localStorage.setItem("poeniVesala", this.brojpoena.toString());
        this.router.navigate(["/geografija"]);
      }
    });
  }
  
  vratiRecZaPogadjanje() {
    
     this.http.get<{ igraDana: any }>('http://localhost:3000/api/igre/igradana/dohvatiIgruDana')
     .subscribe(res => {
       this.http.post<{ rec: string }>('http://localhost:3000/api/igre/igradana/dohvatiVesalo', {vesaloId:res.igraDana.vesala})
         .subscribe(res => {
           console.log(res.rec);
          this.recZaPogadjanje =  res.rec;
          this.slova = this.recZaPogadjanje.split('');
          this.usloviZaPrikaz = new Array(this.recZaPogadjanje.length);
          for (let i = 0; i < this.recZaPogadjanje.length; i++) {
            this.usloviZaPrikaz[i]=false;
          }
          this.imageSource = this.slikaPrazan;
         });

     });




  }



  
}
