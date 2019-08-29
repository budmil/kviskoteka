import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable, timer, Observer } from 'rxjs';
import { switchMap, map, delay } from 'rxjs/operators';
import { mimeType } from './mime-validator';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  

  constructor(private authService : AuthService, private fb : FormBuilder) { }

  regForma : FormGroup;

  linkSlike : string;

  ngOnInit() {
    this.regForma = this.fb.group({
      ime: [''],
      prezime: [''],
      email: [ 
         '',
        [Validators.email],
        this.validirajEmail.bind(this)
      ],
      zanimanje: [''],
      korime: [
        '',
        [],
        this.validirajKorime.bind(this)
      ],
      lozinka: [''],
      pol: [''],
      jmbg: ['', this.validirajJmbg.bind(this)],
      potvrdaLozinke: ['', this.validirajLozinku.bind(this)],
      slika: ['', [Validators.required ], [this.validirajVelicinuSlike.bind(this),mimeType]]
    }, 
    
    );


  }

  validirajVelicinuSlike(control: AbstractControl) {
    if(this.regForma)
      {
      var img = new Image();
      const frObs = Observable.create(
        (observer: Observer<{ [key: string]: any }>) => {
          img.onload = () => {
            if (img.width > 300 || img.height>300) {
              observer.next(null);
            } else { 
              observer.next({ prevelika: true });
            }
            observer.complete();
          }
        }
      );
      
      if (this.linkSlike) {
        img.src = this.linkSlike;
     }
      return frObs;
      
    }
  }


  izabranaSlika(event: Event) {
    if(this.regForma) {

     const file = (event.target as HTMLInputElement).files[0];
      this.regForma.patchValue({slika: file});
      this.regForma.get('slika').updateValueAndValidity(); 
      const reader = new FileReader();
       reader.onload = () => {
        this.linkSlike = reader.result as string;
      };
      reader.readAsDataURL(file); 
    }
  }

  validirajEmail(control: AbstractControl)  {
  
      return timer(800).pipe(
        switchMap(() => this.authService.proveriEmail(control.value)),
        map(res => {
          return res.imaMejla ? {emailZauzet: true} : { emailZauzet: false };
        })
      );
 }

 validirajLozinku() {
   if(this.regForma)
   return this.regForma.get('lozinka').value===this.regForma.get('potvrdaLozinke').value ? {razliciteLozinke:false} : {razliciteLozinke:true};
 }

 validirajJmbg() {
  if(this.regForma) {
      var jmbg = +this.regForma.get('jmbg').value;
      jmbg+=10000000000000;
      var kontrolnaCifra = jmbg % 10;
      console.log(jmbg);
      jmbg = Math.floor(jmbg/10);
      console.log(jmbg);
      var s = 0;
      for (var j = 0; j <2; j++) {
        for (var i=2; i<=7; i++) {
           s = s + (jmbg % 10)*i;
           jmbg = Math.floor(jmbg / 10);
        }
      }

      var ostatak = s % 11;
      var razlika = 11 - ostatak;

      if (ostatak==1) return {neispravanJmbg:true};
      if (ostatak==0 && kontrolnaCifra!=0) return {neispravanJmbg:true};
      if (ostatak<=11 && ostatak>=1 && kontrolnaCifra!=razlika) return {neispravanJmbg:true};
      if (kontrolnaCifra != razlika) return {neispravanJmbg:true};
      return {neispravanJmbg:false};
  }
}

 
 validirajKorime(control: AbstractControl)  {
  
  return timer(800).pipe(
    switchMap(() => this.authService.proveriKorime(control.value)),
    map(res => {
      return res.imaKorime ? {korimeZauzeto: true} : { korimeZauzeto: false };
    })
  );
}





  registracija() {
    // if (this.regForma.invalid) {
    //   return;
    // }
    this.authService.dodajZahtevZaRegistraciju(this.regForma.get('ime').value, this.regForma.get('prezime').value, this.regForma.get('email').value, this.regForma.get('zanimanje').value, this.regForma.get('korime').value, this.regForma.get('lozinka').value, this.regForma.get('pol').value, this.regForma.get('jmbg').value, this.regForma.get("slika").value);

  }
}
