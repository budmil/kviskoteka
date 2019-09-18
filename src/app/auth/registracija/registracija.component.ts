import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable, timer, Observer } from 'rxjs';
import { switchMap, map, delay } from 'rxjs/operators';
//import { mimeType } from './mime-validator';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  isLoading;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  regForma: FormGroup;

  linkSlike: string;

  ngOnInit() {
    this.isLoading = false;
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
      slika: ['', [Validators.required], [this.mimeType, this.validirajVelicinuSlike.bind(this)]],
      tajanstvenoPitanje: ['', Validators.required],
      tajanstveniOdgovor: ['', Validators.required]
    },

    );


  }


  mimeType = (
    control: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    console.log("tip");
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {
        this.isLoading = true;
        fileReader.addEventListener("loadend", () => {
          this.isLoading = false;
          const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
          let header = "";
          let isValid = false;
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          switch (header) {
            case "89504e47":
              isValid = true;
              break;
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
            case "ffd8ffe3":
            case "ffd8ffe8":
              isValid = true;
              break;
            default:
              isValid = false;
              break;
          };
          if (isValid) {
            observer.next(null);
          } else {
            observer.next({ invalidMimeType: true });
          }
          observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
      }
    );
    return frObs;
  };

  validirajVelicinuSlike(control: AbstractControl) {
    const fajl = control.value as File;
    const reader = new FileReader();
    var img = new Image();

    const frObs = Observable.create(
      (observer: Observer<any>) => {
        reader.onload = () => {
          img.onload = () => {
            if (img.width > 300 || img.height > 300) {
              observer.next({ prevelika: true });
            } else {
              observer.next(null);
            }
            console.log(img.width + " * " + img.height);
            observer.complete();
          }
          img.src = reader.result as string;
        }
        reader.readAsDataURL(fajl);
      });


    return frObs;

  }


  izabranaSlika(event: Event) {
    if (this.regForma) {

      const file = (event.target as HTMLInputElement).files[0];
      this.regForma.patchValue({ slika: file });
      this.regForma.get('slika').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        console.log('bla');
        this.linkSlike = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  validirajEmail(control: AbstractControl) {

    return timer(800).pipe(
      switchMap(() => this.authService.proveriEmail(control.value)),
      map(res => {
        return res.imaMejla ? { emailZauzet: true } :null;
      })
    );
  }

  validirajLozinku() {
    if (this.regForma)
      return this.regForma.get('lozinka').value === this.regForma.get('potvrdaLozinke').value ? null : { razliciteLozinke: true };
  }

  validirajJmbg() {
    if (this.regForma) {
      var jmbg = +this.regForma.get('jmbg').value;
      jmbg += 10000000000000;
      var kontrolnaCifra = jmbg % 10;
      jmbg = Math.floor(jmbg / 10);
      var s = 0;
      for (var j = 0; j < 2; j++) {
        for (var i = 2; i <= 7; i++) {
          s = s + (jmbg % 10) * i;
          jmbg = Math.floor(jmbg / 10);
        }
      }

      var ostatak = s % 11;
      var razlika = 11 - ostatak;

      if (ostatak == 1) return { neispravanJmbg: true };
      if (ostatak == 0 && kontrolnaCifra != 0) return { neispravanJmbg: true };
      if (ostatak <= 11 && ostatak >= 1 && kontrolnaCifra != razlika) return { neispravanJmbg: true };
      if (kontrolnaCifra != razlika) return { neispravanJmbg: true };
      return null;
    }
  }


  validirajKorime(control: AbstractControl) {

    return timer(800).pipe(
      switchMap(() => this.authService.proveriKorime(control.value)),
      map(res => {
        return res.imaKorime ? { korimeZauzeto: true } : null;
      })
    );
  }





  registracija() {
    // if (this.regForma.invalid) {
    //   return;
    // }
    this.authService.dodajZahtevZaRegistraciju(this.regForma.get('ime').value, this.regForma.get('prezime').value, this.regForma.get('email').value, this.regForma.get('zanimanje').value, this.regForma.get('korime').value, this.regForma.get('lozinka').value, this.regForma.get('pol').value, this.regForma.get('jmbg').value, this.regForma.get("slika").value, this.regForma.get("tajanstvenoPitanje").value, this.regForma.get("tajanstveniOdgovor").value);

  }
}
