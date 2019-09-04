import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-vesala-multi',
  templateUrl: './vesala-multi.component.html',
  styleUrls: ['./vesala-multi.component.css'],
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



export class VesalaMultiComponent implements OnInit {


  azbuka = ['a','b','v','g','d','đ','e','ž','z','i','j','k','l','lj','m','n','nj','o','p','r','s','t','v','u','f','h','c','č','dž','š'];
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

  constructor(private socketioService : SocketioService) {

  }

  ngOnInit() {


    this.socketioService.vratiRecZaPogadjanje().subscribe(data => {
      this.recZaPogadjanje = data;
      this.slova = this.recZaPogadjanje.split('');
      this.usloviZaPrikaz = new Array(this.recZaPogadjanje.length);
      for (let i = 0; i < this.recZaPogadjanje.length; i++) {
        this.usloviZaPrikaz[i]=false;
      }
    });
    this.numOfGuesses = 0;
   
    this.imageSource = this.slikaPrazan;
    console.log(this.recZaPogadjanje);
  }


  proveri(slovo:string) {
    console.log(this.recZaPogadjanje);
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
      this.socketioService.zavrsio(true);
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
      case 5: {
       this.imageSource = this.slikaCeo; 
       this.obesen = true;
       this.socketioService.zavrsio(false).subscribe(ret => {console.log(ret); });
       this.choice = 1; 
       break;
      }
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
  

}
